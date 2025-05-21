import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        
        // Assuming the response contains an array of posts, not just one post.
        setPosts(response?.data[0]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts_container">
       {posts && posts.length > 0 ? (
  posts.map(({ _id: id, title, thumbnail, description, creator, category, createdAt }) => (
    <PostItem
      key={id}
      postID={id}
      title={title}
      thumbnail={thumbnail}
      description={description}
      category={category}
      authorID={creator}
      createdAt={createdAt}
    />
  ))
) : (
  <p>No posts available.</p>
)}

        </div>
      ) : (
        <h2 className="center">No posts</h2>
      )}
    </section>
  );
};

export default Post;
