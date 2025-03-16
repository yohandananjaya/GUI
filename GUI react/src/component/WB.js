import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./WB.css";

function WB() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [posts, setPosts] = useState([]); // State to store posts
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showGroups, setShowGroups] = useState(false); // State to toggle groups view

  // Fetch posts from the database when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data); // Update the state with fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePostToServer = async (postData) => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      const savedPost = await response.json();
      return savedPost;
    } catch (error) {
      console.error("Error saving post:", error);
      return null;
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (newPost.trim() !== "" || selectedImage) {
      const newPostObj = {
        user: "You", // Replace with the logged-in user's name
        content: newPost,
        image: selectedImage,
      };

      // Save the post to the server
      const savedPost = await savePostToServer(newPostObj);
      if (savedPost) {
        // Update the local state with the saved post
        setPosts([savedPost, ...posts]);
        setNewPost("");
        setSelectedImage(null);
        fileInputRef.current.value = ""; // Clear file input
      } else {
        alert("Failed to save the post. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId"); // Clear user data
    navigate("/"); // Redirect to login page
  };

  const toggleGroups = () => {
    setShowGroups(!showGroups);
  };

  return (
    <div className="home-container">
      {/* Left-Side Navigation Bar */}
      <div className="left-side-buttons">
        <h2 className="brand-name">WORKBRIDGE</h2>
        <NavLink to="/appointment/home" className="nav-button" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/appointment/wb" className="nav-button" activeClassName="active">
          WB
        </NavLink>
        <NavLink to="/appointment/table" className="nav-button" activeClassName="active">
          Profile
        </NavLink>
        <NavLink to="/appointment/messages" className="nav-button" activeClassName="active">
          Messages
        </NavLink>

        {/* Log Out Button */}
        <button onClick={handleLogout} className="nav-button logout-btn">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Groups Icon (Top Right) */}
        <div className="groups-icon" onClick={toggleGroups}>
          👥
        </div>

        <h1>Workbridge Feed</h1>

        {/* Groups Section */}
        {showGroups && (
          <div className="groups-section">
            <h2>Groups</h2>
            <div className="groups-list">
              <div className="group">Group 1</div>
              <div className="group">Group 2</div>
              <div className="group">Group 3</div>
            </div>
          </div>
        )}

        {/* Existing Posts */}
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <span className="post-user">{post.user}</span>
              </div>
              <div className="post-content">{post.content}</div>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post" className="uploaded-image" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* New Post Form (Bottom) */}
        <div className="post-form-container">
          <form onSubmit={handlePostSubmit} className="post-form">
            <div className="post-input-wrapper">
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={handlePostChange}
                rows="3"
                className="post-input"
              />
              <div className="post-form-actions">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="file-input"
                  id="file-input"
                />
                <label htmlFor="file-input" className="filee-input-label">
                  📷
                </label>
                <button type="submit" className="btn2 btn-primary">
                  Post
                </button>
              </div>
            </div>
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Preview" className="preview-image" />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default WB;