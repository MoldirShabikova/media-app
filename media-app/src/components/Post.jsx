import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import { Icon } from "@iconify/react";
import "animate.css/animate.min.css";

const Form = () => {
  const url = "http://localhost:8080";
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
 

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState('');
  const [status, setStatus] = useState("true");

  const handleInputImage = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId, 'userID')
    console.log(localStorage.getItem('userId', userId))
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("userId",userId);
    formData.append("file", file);

    axios
      .post(`${url}/posts`, formData, {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="post-container">
      <div className="post-box">
        <h2 className="post-title">Add Post</h2>
        <form
          className=""
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input "
          />
          {file && <img className="add-img" src={URL.createObjectURL(file)} />}
          <input
            type="text"
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=""
          />
          
          <input
            type="file"
            name="file"
            onChange={handleInputImage}
            className=""
          />
          <div className="">
            <div className="radio-btn">
              <label htmlFor="private-status">private:</label>
              <input
                type="radio"
                name="status"
                id="private-status"
                value="true"
                onChange={(e) => setStatus(e.target.value.toString())}
                checked={status === "true"}
              />
            </div>

            <div className="radio-btn">
              <label htmlFor="public-status">public:</label>
              <input
                type="radio"
                name="status"
                id="public-status"
                value="false"
                onChange={(e) => setStatus(e.target.value.toString())}
                checked={status === "false"}
              />
            </div>
          </div>
          <button  className="btn btn-primary">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
