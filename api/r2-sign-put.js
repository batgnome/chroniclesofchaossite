const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    let { key, contentType } = req.body || {};
    if (!key || typeof key !== "string") return res.status(400).json({ error: "Missing key" });

    // sanitize
    key = key.replace(/^\/+/, "");

    // allow only these prefixes
    if (!key.startsWith("comics/") && !key.startsWith("posts/")) {
      return res.status(400).json({ error: "Invalid key prefix" });
    }

    const client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      forcePathStyle: true,

      // THIS is the big one: prevents AWS SDK from injecting checksum behavior in many cases
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",

      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    // keep the command minimal (no ContentType, no metadata, no checksum fields)
    const cmdInput = {
      Bucket: process.env.R2_BUCKET,
      Key: key,
    };

    if (typeof contentType === "string" && contentType.trim()) {
      cmdInput.ContentType = contentType.trim();
    }

    const cmd = new PutObjectCommand(cmdInput);

    const uploadUrl = await getSignedUrl(client, cmd, { expiresIn: 60 });
    const publicUrl = `${process.env.R2_PUBLIC_BASE_URL}/${key}`;

        return res.status(200).json({
    uploadUrl,
    publicUrl,
    uploadHost: new URL(uploadUrl).host,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to sign upload" });
  }
};