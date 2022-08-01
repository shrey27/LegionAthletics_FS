const express = require("express");
const router = express.Router();
const { VideoUser } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await VideoUser.find({ email: req.email });
      const watchlater = user[0].watchlater;
      res.json({ success: true, watchlater })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get watchlater videos", errorMessage: err.message    })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { video } = req.body;
      await VideoUser.findOneAndUpdate({ email: req.email }, { $push: { watchlater: {...video} } });
      let user = await VideoUser.find({ email: req.email });
      const watchlater = user[0].watchlater;
      res.json({ success: true, watchlater })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update watchlater videos", errorMessage: err.message })
    }
  })

router.route("/all")
  .delete(authUser, async (req, res) => {
    try {
      await VideoUser.updateOne(
        { email: req.email },
        { $set: { 'watchlater': [] } });
      let user = await VideoUser.find({ email: req.email });
      const watchlater = user[0].watchlater;
      res.json({ success: true, watchlater })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to clear watchlater videos", errorMessage: err.message })
    }
  })

router.route("/:id")
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await VideoUser.updateOne(
        { email: req.email },
        { $pull: { 'watchlater': { _id: id } } });
      let user = await VideoUser.find({ email: req.email });
      const watchlater = user[0].watchlater;
      res.json({ success: true, watchlater })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to delete watchlater video", errorMessage: err.message })
    }
  })

module.exports = router