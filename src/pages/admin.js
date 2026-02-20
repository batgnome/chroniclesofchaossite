import { useState, useEffect } from "react";
// import BlogForm from "../components/BlogForm";
// import BlogList from "../components/BlogList";

function Admin() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // const addPost = (newPost) => {
  //   const updatedPosts = [newPost, ...posts];
  //   setPosts(updatedPosts);
  //   localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  // };

  return (
    <div>
      <h1>Blog</h1>
      <div>
        <h2>Admin Panel</h2>
        <p>Here you can add new blog posts.</p>
        <h2>Blog posts</h2>
        <p>{posts.length} posts available</p>
      </div>
      <div>
        <h2>settings</h2>
      </div>
      {/* <BlogForm addPost={addPost} /> */}
      {/* <BlogList /> */}
    </div>
  );
}

export default Admin;
