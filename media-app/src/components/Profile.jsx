import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { Icon } from "@iconify/react";
import Header from "./Header";
import LeftProfile from "./LeftProfile";
import  MyProfile from './MyProfile'
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
      <>
       
        <div className="" key={post.id}>
          <div className="feeds">
            <div className="feed">

        
            <h2>{post.title}</h2>
            <h4>{post.user.username}</h4>
            <p>{post.content}</p>
            <img
              src={`./upload/${post.image}`}
              alt={post.image}
              style={{ width: 200, height: 200 }}
            />

            {+userId === post.userId && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => updatePost(post.id, post.privateStatus)}
                >
                  {post.privateStatus ? "make public" : "make private"}
                </button>
                <Icon
                  icon="material-symbols:delete-outline"
                  style={{ marginLeft: 10 }}
                  onClick={() => deletePost(post.id)}
                />
              </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  });

  return mappedPosts.length >= 1 ? (
    <>
      <LeftProfile />
      <div className="middle">
        <MyProfile />
        <div className="middle"> {mappedPosts}</div>
      </div>
    </>
  ) : (
    <main>
      <h1>You haven't posted yet!</h1>
    </main>
  );
};

export default Profile;
