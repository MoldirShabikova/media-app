import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LeftProfile from "./LeftProfile";
import AuthContext from "../store/authContext";

const Home = () => {
  const url = "http://localhost:8080";
  const { userId } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);


  
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
      <main>
       
        <div class="container" key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <h4>{post.user.username}</h4>
          <p>{post.content}</p>
          <img src={`./upload/${post.image}`} />
        </div>
      </main>
    );
  });

  return mappedPosts.length >= 1 ? (
    <>
     <LeftProfile/>
      <main>{mappedPosts}</main>
    </>
  ) : (
    <main>
      <h1>There are no posts yet!</h1>
      </main>
    
  );
};

export default Home;
