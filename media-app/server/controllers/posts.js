const { Post } = require("../models/post");
const { User } = require("../models/user");
const { Comments } = require("../models/comments");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
    
        include: {
          model: User,
         
          attributes: [`username`],
          include: {
              model: Comments,
           
              attributes: [`description`],
          },
        },
  
      });
      console.log('posts', posts)
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
  addPost: async (req, res) => {
    try {
      const { title, content, status, userId } = req.body;
      const file = req.file;
      console.log(req.body, 'body')
      await Post.create({
        title,
        content,
        privateStatus: status,
        userId,
        image: file.filename,
      });
      res.status(200).json({ message: "Post created successfully." });
    } catch (error) {
      console.log("ERROR IN addPost");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getCurrentUserPosts: async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  editPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Post.update(
        { privateStatus: status },
        {
          where: { id: +id },
        }
      );
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
