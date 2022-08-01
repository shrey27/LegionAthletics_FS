const express = require("express");
const router = express.Router();
const { VideoUser } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await VideoUser.find({ email: req.email });
      const history = user[0].history;
      res.json({ success: true, history })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get history items", errorMessage: err.message    })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { video } = req.body;
      await VideoUser.findOneAndUpdate({ email: req.email }, { $push: { history: {...video} } });
      let user = await VideoUser.find({ email: req.email });
      const history = user[0].history;
      res.json({ success: true, history })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update history", errorMessage: err.message })
    }
  })

router.route("/all")
  .delete(authUser, async (req, res) => {
    try {
      await VideoUser.updateOne(
        { email: req.email },
        { $set: { 'history': [] } });
      let user = await VideoUser.find({ email: req.email });
      const history = user[0].history;
      res.json({ success: true, history })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to clear history", errorMessage: err.message })
    }
  })

router.route("/:id")
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await VideoUser.updateOne(
        { email: req.email },
        { $pull: { 'history': { _id: id } } });
      let user = await VideoUser.find({ email: req.email });
      const history = user[0].history;
      res.json({ success: true, history })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update history", errorMessage: err.message })
    }
  })



module.exports = router