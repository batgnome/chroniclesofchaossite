import { useState, useEffect } from "react";

function BlogList() {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Function to delete a post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="blog-list">
      <h2>Blog Posts</h2>
      {posts.length === 0 ? <p>No blog posts yet.</p> : null}
      {posts.map((post) => (
        <div key={post.id} className="blog-card">
          {post.image && <img src={post.image} alt={post.title} />}
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><small>{post.date}</small></p>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
