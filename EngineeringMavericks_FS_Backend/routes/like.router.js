const express = require("express");
const router = express.Router();
const { VideoUser } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await VideoUser.find({ email: req.email });
      const likes = user[0].likes;
      res.json({ success: true, likes })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get liked videos", errorMessage: err.message    })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { video } = req.body;
      await VideoUser.findOneAndUpdate({ email: req.email }, { $push: { likes: {...video} } });
      let user = await VideoUser.find({ email: req.email });
      const likes = user[0].likes;
      res.json({ success: true, likes })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update liked videos", errorMessage: err.message })
    }
  })

router.route("/:id")
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await VideoUser.updateOne(
        { email: req.email },
        { $pull: { 'likes': { _id: id } } });
      let user = await VideoUser.find({ email: req.email });
      const likes = user[0].likes;
      res.json({ success: true, likes })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to delete liked videos", errorMessage: err.message })
    }
  })

module.exports = router