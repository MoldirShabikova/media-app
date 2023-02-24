import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Profile = () => {
  const url = "http://localhost:8080";
  const { userId, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

console.log(userId, 'userID')
  const getUserPosts = useCallback(() => {
    axios
      .get(`${url}/userposts/${userId}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  const updatePost = (id, status) => {
    axios
      .put(
        `${url}/posts/${id}`,
        { status: !status },
        {
          headers: {
            authorization: token,
            // "Content-Type": "application / json",
          },
        }
      )
      .then(() => {
        getUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${url}/posts/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(() => {
        getUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedPosts = posts.map((post) => {
    console.log(post.userId, "test", userId);
    return (
  
      <div key={post.id} >
        <div className="post-box">
          <h2>{post.title}</h2>
          <h4>{post.user.username}</h4>
          <p>{post.content}</p>
          <img src={`./upload/${post.image}`} alt={post.image} style={{ width: 200,  height:200 }} />

          {+userId === post.userId && (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => updatePost(post.id, post.privateStatus)}

              >
                {post.privateStatus ? "make public" : "make private"}
              </button>
              <button
                className="btn btn-primary"
                style={{ marginLeft: 10 }}
                onClick={() => deletePost(post.id)}
              >
                delete post
              </button>
            </div>
          )}
        </div>
        </div>

    );
  });

  return mappedPosts.length >= 1 ? (
    <div className="middle">
      <div >
        {mappedPosts}
      </div>
      </div>
     
  ) : (
    <main>
      <h1>You haven't posted yet!</h1>
    </main>
  );
};

export default Profile;
