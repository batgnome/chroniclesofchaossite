import { useState, useEffect } from "react";
// import BlogForm from "../components/BlogForm";
// import BlogList from "../components/BlogList";
import NewComic from "../components/admin/NewComic";
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
    <NewComic />
    </div>
  );
}

export default Admin;
