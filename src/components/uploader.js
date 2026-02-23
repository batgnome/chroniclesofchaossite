import { useState } from "react";

export default function R2UploadTest() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("comics/test/cover.jpg");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      setStatus("Pick a file first.");
      return;
    }

    setIsUploading(true);
    setStatus("Signing upload...");

    try {
      // 1) Ask Vercel function for a signed URL
      const signRes = await fetch("/api/r2-sign-put", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          // keep this if your API still accepts it; safe either way
          contentType: file.type || "application/octet-stream",
        }),
      });

      if (!signRes.ok) {
        const text = await signRes.text().catch(() => "");
        throw new Error(`Sign failed: ${signRes.status} ${text}`);
      }

      const { uploadUrl, publicUrl } = await signRes.json();

      // 2) PUT directly to R2 using the signed URL
      setStatus("Uploading to R2...");
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        // IMPORTANT: for now, do NOT set headers.
        // Presigned URLs can be picky; we’ll add Content-Type later once it works.
      });

      if (!putRes.ok) {
        const text = await putRes.text().catch(() => "");
        throw new Error(`Upload failed: ${putRes.status}\n${text}`);
      }

      setStatus(`✅ Uploaded!\n${publicUrl}`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 700 }}>
      <h2>R2 Upload Test</h2>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>R2 key (path)</label>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: "100%", padding: 8 }}
          placeholder="comics/test/cover.jpg"
        />
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
          Uploading key: <code>{key}</code>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      <div style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{status}</div>
    </div>
  );
}