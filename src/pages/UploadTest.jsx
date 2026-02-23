import { useState } from "react";

export default function UploadTest() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("comics/test/cover.jpg");
  const [status, setStatus] = useState("");

  async function upload() {
    if (!file) return setStatus("Pick a file first.");

    setStatus("Signing...");
    const signRes = await fetch("/api/r2-sign-put", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, contentType: file.type }),
    });

    if (!signRes.ok) {
      setStatus(`Sign failed: ${await signRes.text()}`);
      return;
    }

    const { uploadUrl, publicUrl } = await signRes.json();

    setStatus("Uploading to R2...");
    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });

    if (!putRes.ok) {
      setStatus(`Upload failed: ${putRes.status} ${await putRes.text()}`);
      return;
    }

    setStatus(`✅ Uploaded!\n${publicUrl}`);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>R2 Upload Test</h2>

      <div style={{ marginBottom: 8 }}>
        <div>Key (path in bucket):</div>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: 500, padding: 6 }}
        />
      </div>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <div style={{ marginTop: 8 }}>
        <button onClick={upload}>Upload</button>
      </div>

      <pre style={{ marginTop: 12 }}>{status}</pre>
    </div>
  );
}