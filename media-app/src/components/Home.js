import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LeftProfile from "./LeftProfile";
import AuthContext from "../store/authContext";
import Stories from './Stories'
import Comments from "./Comments";
const Home = () => {
  const url = "http://localhost:8080";
  const { userId, image } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

   const [commentOpen, setCommentOpen] = useState(false);
  
  useEffect(() => {
    axios
      .get(`${url}/posts`)
      .then((res) => {
        if (userId) {
          const otherUsersPosts = res.data.filter(
            (post) => userId !== post.userId
          );
          setPosts(otherUsersPosts);
        } else {
          setPosts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

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
                <div className="info">
                  <h3>{post.user.username}</h3>
                  <small>{post.content}</small>
                </div>
              </div>
              <span className="edit">
                <i className="uil uil-ellipsis-h"> </i>
              </span>
              <div className="photo">
                <img src={`./upload/${post.image}`} />
              </div>
              <div className="action-button">
                <div className="interaction-buttons">
                  <span>
                    <i className="uil uil-heart"></i>
                  </span>
                  <span>
                    <i className="uil uil-comment-dots"></i>
                  </span>
                  <span>
                    <i className="uil uil-share-alt"></i>
                  </span>
                </div>
                <div className="bookmark">
                  <span>
                    <i className="uil uil-bookmark-full"></i>
                  </span>
                </div>
              </div>
              <div className="liked-by">
                {/* <span>
                      <img src="./assests/images/profile-10.jpg" alt="" />
                    </span>
                    <span>
                      <img src="./assests/images/profile-4.jpg" alt="" />
                    </span>
                    <span>
                      <img src="./assests/images/profile-15.jpg" alt="" />
                    </span> */}
                <p>
                  Liked by <b>Ernest </b> and <b>2,300 others</b>
                </p>
              </div>
              <div className="caption">
                <p>
                  <b>{post.user.userName}</b>
                  {post.title}
                </p>
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
