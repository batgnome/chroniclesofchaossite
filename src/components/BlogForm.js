// import { useState, useEffect } from "react";

function BlogForm({ addPost }) {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [image, setImage] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!title || !content) {
  //     alert("Title and content are required!");
  //     return;
  //   }

  //   // Create new post object
  //   const newPost = {
  //     id: Date.now(), // Unique ID
  //     title,
  //     content,
  //     image,
  //     date: new Date().toLocaleDateString(),
  //   };

  //   addPost(newPost);

  //   // Reset form fields
  //   setTitle("");
  //   setContent("");
  //   setImage("");
  // };

  return (
    <div className="blog-form">
      {/* <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <input type="text" placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Add Post</button>
      </form> */}
    </div>
  );
}

export default BlogForm;
