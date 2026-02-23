const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    let { key } = req.body || {};
    if (!key || typeof key !== "string") return res.status(400).json({ error: "Missing key" });

    key = key.replace(/^\/+/, "");
    key = key.replace(/^comics\//, "");   // strip if user included it
    key = `comics/${key}`;               // force exactly one prefix

    const client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      forcePathStyle: true,
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    const cmd = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET, // should be "comics"
      Key: key,                      // "comics/test/cover.jpg"
    });

    const uploadUrl = await getSignedUrl(client, cmd, { expiresIn: 60 });
    const publicUrl = `${process.env.R2_PUBLIC_BASE_URL}/${key}`;

    return res.status(200).json({
      uploadUrl,
      publicUrl,
      uploadHost: new URL(uploadUrl).host,
      signedPath: new URL(uploadUrl).pathname,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to sign upload" });
  }
};