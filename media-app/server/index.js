require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { sequelize } = require("./util/db");
const { SERVER_PORT } = process.env;
const { User } = require("./models/user");
const { Post } = require("./models/post");
const {Comments} = require("./models/comments")
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
 
const {
  getAllComments,
  addComment,
  deleteComment,
} = require("./controllers/comments");

const app = express();

app.use(express.json());
app.use(cors());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);
Post.hasMany(Comments)
Comments.belongsTo(Post)

//Auth
app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, upload.single("file"), addPost);
app.put("/posts/:id", isAuthenticated, upload.single("file"), editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

app.get('/comments/:postId', getAllComments)
app.post('/comments', addComment)
app.delete("/comments", deleteComment);

//connecting to my backend
sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(
        "Successfully connected db, server running to port:",
        SERVER_PORT
      );
    });
  })
  .catch((err) => console.log(err));
