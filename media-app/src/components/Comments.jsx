import { useContext, useEffect, useState } from "react";
import "./comments.css";
import AuthContext from "../store/authContext";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:8080";

const Comments = ({ postId }) => {
  const { token } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const image = localStorage.getItem("image");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
console.log(comment, 'allcomment')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url}/comments`,
        { description: comment, postId },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        setComments([...comments, res.data]); // add the new comment to the comments array
        setComment(""); // clear the input field
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${url}/comments/${postId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  return (
    <div className="comments">
      <form className="write" onSubmit={handleSubmit}>
        <img className="comment-img" src={image} alt="" />
        <input
          className="comment-input"
          type="text"
          placeholder="write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="comment-btn" type="submit">
          Send
        </button>
      </form>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img className="comment-img" src={image} alt="" />
          <div className="info">
            <span>{username}</span>
            <p>{comment.description}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
