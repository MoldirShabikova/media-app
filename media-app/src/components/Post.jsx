import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";
import "./Post.css"

const Form = () => {
  const url = "http://localhost:8080";
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('')
  const [status, setStatus] = useState(true);


  const handleInputImage = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0]);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(image, "image")
    axios
      .post(
        `${url}/posts`,
        { title, content, status, userId, image:image.name },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
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
            className="form-input add-post-input"
          />
          <input type="file" placeholder="image" onChange={handleInputImage} />
          <textarea
            type="text"
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=""
          />
          <div className="">
            <div className="radio-btn">
              <label htmlFor="private-status">private:</label>
              <input
                type="radio"
                name="status"
                id="private-status"
                value={true}
                onChange={(e) => setStatus(e.target.value)}
                checked={true}
              />
            </div>

            <div className="radio-btn">
              <label htmlFor="public-status">public:</label>
              <input
                type="radio"
                name="status"
                id="public-status"
                value={false}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary">submit</button>
        </form>
      </div>
    </main>
  );
};

export default Form;
