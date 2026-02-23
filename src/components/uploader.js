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
    setStatus("Uploading...");

    try {
      const res = await fetch(`http://localhost:8787/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file, // IMPORTANT: send the raw file bytes
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Upload failed: ${res.status} ${text}`);
      }

      setStatus(`✅ Uploaded to ${key}`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 700 }}>
      <h2>R2 Upload Test (local worker)</h2>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>R2 key (path)</label>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: "100%", padding: 8 }}
          placeholder="comics/test/cover.jpg"
        />
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
          This becomes: <code>http://localhost:8787/{key}</code>
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