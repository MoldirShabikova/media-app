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
  const [posts, setPosts] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState({});

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
        // initialize the likes state with the number of likes for each post
        const initialLikes = {};
        res.data.forEach((post) => {
          initialLikes[post.id] = post.likes.length;
        });
        setLikes(initialLikes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLike = (postId) => {
    // check if the post is already liked by the user
    if (likes[postId]) {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: prevLikes[postId] - 1, // decrease the number of likes by 1
      }));
    } else {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: 1, // increase the number of likes by 1
      }));
    }
  };

  const mappedPosts = posts.map((post) => {
    return (
      <div className="middle">
        <div className="feeds">
          <div className="feed">
            <div className="head" key={post.id}>
              <div className="user">
                <div className="profile-photo">
                  <img src={image} alt="profile-img" />
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
                  <Icon
                    icon={likes[post.id] ? "openmoji:red-heart" : "uil:heart"}
                    onClick={() => handleLike(post.id)}
                  />
                  {likes[post.id] || 0} Likes
                  <Icon
                    icon="uil:comments-alt"
                    onClick={() => setCommentOpen(!commentOpen)}
                  />
                  {comments.length} Comments
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
            {commentOpen && (
              <Comments
                comments={comments}
                setComments={setComments}
                postId={post.id}
              />
            )}
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
