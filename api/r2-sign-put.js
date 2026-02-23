const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    const { key, contentType } = req.body || {};
    if (!key) return res.status(400).json({ error: "Missing key" });

    // basic safety: only allow specific prefixes
    if (!key.startsWith("comics/") && !key.startsWith("posts/")) {
      return res.status(400).json({ error: "Invalid key prefix" });
    }

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      ContentType: contentType || "application/octet-stream",
    });

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 60 });
    const publicUrl = `${process.env.R2_PUBLIC_BASE_URL}/${key}`;

    return res.status(200).json({ uploadUrl, publicUrl });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "signing failed" });
  }
};