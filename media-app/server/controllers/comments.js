const { Post } = require("../models/post");
const { User } = require("../models/user");
const { Comments } = require("../models/comments");


module.exports = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comments.findAll({
        include: {
          model: User,

          attributes: [`username`],
          include: {
            model: Comments,

            attributes: [`description`],
          },
        },
      });
      res.status(200).send(comments);
    } catch (error) {
      console.log("ERROR IN getAllComments");
      console.log(error);
      res.sendStatus(400);
    }
  },
  addComment: async (req, res) => {
    try {
      const { description, userId, createdAt, postId } = req.body;

      console.log(req.body, "body");
      await Comments.create({
        description,
        createdAt,
        userId,
        postId,
      });
      res.status(200).json({ message: "Comment created successfully." });
    } catch (error) {
      console.log("ERROR IN addComment");
      console.log(error);
      res.sendStatus(400);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      await Comments.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN getCurrentUserComments");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
