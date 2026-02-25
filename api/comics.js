const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const BUCKET = process.env.R2_BUCKET;              // e.g. "comics"
const KEY = "data/comics.json";                    // where metadata lives in the bucket

function r2Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

async function readJson() {
  const client = r2Client();

  try {
    const out = await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: KEY }));
    const text = await out.Body.transformToString();
    return JSON.parse(text);
  } catch (err) {
    // If file doesn't exist yet, start fresh
    if (err?.name === "NoSuchKey" || err?.$metadata?.httpStatusCode === 404) {
      return { comics: [] };
    }
    throw err;
  }
}

async function writeJson(data) {
  const client = r2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: KEY,
      Body: JSON.stringify(data, null, 2),
      ContentType: "application/json",
      CacheControl: "no-cache",
    })
  );
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      const data = await readJson();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const payload = req.body || {};

      // Minimal validation
      const title = payload.title?.trim();
      if (!title) return res.status(400).json({ error: "Missing title" });

      const id = payload.id ? slugify(payload.id) : slugify(title);
      if (!id) return res.status(400).json({ error: "Invalid id/title" });

      const data = await readJson();

      if (data.comics.some((c) => c.id === id)) {
        return res.status(409).json({ error: `Comic '${id}' already exists` });
      }

      const now = new Date().toISOString();

      const newComic = {
        id,
        title,
        description: payload.description || "",
        coverImage: payload.coverImage || "",
        assetBaseUrl: payload.assetBaseUrl || `https://assets.chronofchaos.com/comics/${id}`,
        pageExt: payload.pageExt || "webp",
        pageDigits: payload.pageDigits || 4,
        chapters: payload.chapters || [{ id: "ch01", title: "Chapter 1", pageCount: 0 }],
        status: payload.status || "active",
        createdAt: now,
        updatedAt: now,
      };

      data.comics.push(newComic);
      await writeJson(data);

      return res.status(201).json({ ok: true, comic: newComic });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};