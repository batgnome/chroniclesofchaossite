import { useState } from "react";

export default function R2UploadTest() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("comics/test/cover.jpg");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadHost, setUploadHost] = useState("");

  async function handleUpload() {
    if (!file) {
      setStatus("Pick a file first.");
      return;
    }

    setIsUploading(true);
    setStatus("Signing upload...");

    try {
      const signRes = await fetch("/api/r2-sign-put", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          contentType: file.type || "application/octet-stream",
        }),
      });

      if (!signRes.ok) {
        const text = await signRes.text().catch(() => "");
        throw new Error(`Sign failed: ${signRes.status}\n${text}`);
      }

      const data = await signRes.json();
      const { uploadUrl, publicUrl } = data;

      setUploadHost(data.uploadHost || new URL(uploadUrl).host);

      setStatus("Uploading to R2...");
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
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

      {uploadHost && (
        <div style={{ marginBottom: 12, fontSize: 12 }}>
          Upload Host: {uploadHost}
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>R2 key (path)</label>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: "100%", padding: 8 }}
          placeholder="comics/test/cover.jpg"
        />
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