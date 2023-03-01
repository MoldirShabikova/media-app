import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LeftProfile from "./LeftProfile";
import AuthContext from "../store/authContext";
import Stories from './Stories'
import Comments from "./Comments";
import { Icon } from "@iconify/react";
import moment from "moment"
const Home = () => {
  const url = "http://localhost:8080";
  const { userId } = useContext(AuthContext);
const image = localStorage.getItem("image");
const content = localStorage.getItem("content");
  const [posts, setPosts] = useState([]);

   const [commentOpen, setCommentOpen] = useState(false);
  const liked =false
  useEffect(() => {
    axios
      .get(`${url}/posts`)
      .then((res) => {
        if (userId) {
          const otherUsersPosts = res.data.filter(
            (post) => userId !== post.userId
          );
          setPosts(otherUsersPosts);
             console.log("posts", res.data);
        } else {
          setPosts(res.data);
        
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mappedPosts = posts.map((post) => {
    return (
      <div className="middle">
        <div className="feeds">
          <div className="feed">
            <div className="head" key={post.id}>
              <div className="user">
                <div className="profile-photo">
                  <img src={image} alt="person" />
                </div>
                <div className="ingo">
                  <h3>{post.user.username}</h3>
                  <small>{moment(post.createdAt).fromNow()}</small>
                </div>
              </div>
              <span className="edit">
                <i className="uil uil-ellipsis-h"> </i>
              </span>
              <p>{post.title}</p>
              <div className="photo">
                <img src={`./upload/${post.image}`} />
              </div>
              <div className="action-button">
                <div className="interaction-buttons">
                  {liked ? (
                    <Icon icon="openmoji:red-heart" />
                  ) : (
                    <Icon icon="uil:heart" />
                  )}
                  5 Likes
                  <Icon
                    icon="uil:comments-alt"
                    onClick={() => setCommentOpen(!commentOpen)}
                  />
                  2 Comments
                </div>
                <div className="bookmark">
                  <i className="uil uil-bookmark-full"></i>
                </div>
              </div>

              <div
                className="item"
                onClick={() => setCommentOpen(!commentOpen)}
              >
                See Comments
              </div>
            </div>
            {commentOpen && <Comments postId={post.id} />}
          </div>
        </div>
      </div>
    );
  });

  return mappedPosts.length >= 1 ? (
    <>
      <LeftProfile />
      <div className="middle">
       
        <Stories />
        <div className="middle">{mappedPosts}</div>
      </div>
    </>
  ) : (
    <main>
      <LeftProfile />
      <h1>There are no posts yet!</h1>
    </main>
  );
};

export default Home;
