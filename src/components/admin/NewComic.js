import { useState,useEffect } from "react";
import R2UploadTest from "../../pages/UploadTest";

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function NewComic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [key, setKey] = useState("comics/test/cover.jpg");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadHost, setUploadHost] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const id = slugify(title);

    const payload = {
      id,
      title,
      description,
      coverImage: coverUrl, // <-- from upload
      assetBaseUrl: `https://assets.chronofchaos.com/comics/${id}`,
      pageExt: "webp",
      pageDigits: 4,
      chapters: [{ id: "ch01", title: "Chapter 1", pageCount: 0 }],
      status: "active",
    };

    const res = await fetch("/api/comics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) return alert(data.error || "Failed");
    handleUpload();
    alert("Created!");
  }
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleUpload() {
    if (!file) return setStatus("Pick a file first.");

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

      if (!signRes.ok) throw new Error(`Sign failed: ${signRes.status}`);

      const { uploadUrl, publicUrl, uploadHost: host } = await signRes.json();
      setUploadHost(host || new URL(uploadUrl).host);

      setStatus("Uploading to R2...");
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });

      if (!putRes.ok) throw new Error(`Upload failed: ${putRes.status}`);

      setStatus(`✅ Uploaded!\n${publicUrl}`);
    //   onUploaded?.({ publicUrl, key });
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  }
  return (
    <div>
      <h1>New Comic</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" required value={title} onChange={(e) => {setTitle(e.target.value); setKey(`comics/${slugify(e.target.value)}/cover.jpg`);}} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
           <div style={{ padding: 16, maxWidth: 700 }}>
      <h2>R2 Upload</h2>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>R2 key (path)</label>
        <input value={key} onChange={(e) => setKey(e.target.value)} style={{ width: "100%", padding: 8 }} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Preview */}
      {previewUrl && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, marginBottom: 6 }}>Preview:</div>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: 300,
              display: "block",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
        </div>
      )}

      {/* <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button> */}

      <div style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{status}</div>
      {uploadHost && <div style={{ marginTop: 8, fontSize: 12 }}>Upload Host: {uploadHost}</div>}
    </div>
          {coverUrl ? <p>Cover: {coverUrl}</p> : null}
        </div>

        <button onClick={handleUpload} disabled={!file || isUploading} type="submit">
        {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default NewComic;