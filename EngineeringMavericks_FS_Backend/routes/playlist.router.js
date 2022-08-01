const express = require("express");
const router = express.Router();
const { VideoUser } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  // Get all playlists
  .get(authUser, async (req, res) => {
    try {
      const user = await VideoUser.find({ email: req.email });
      const playlists = user[0].playlists;
      res.json({ success: true, playlists })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get playlists", errorMessage: err.message })
    }
  })
  // add new playlist
  .post(authUser, async (req, res) => {
    try {
      let { playlist } = req.body;
      await VideoUser.findOneAndUpdate({ email: req.email }, { $push: { playlists: { ...playlist } } });
      let user = await VideoUser.find({ email: req.email });
      const playlists = user[0].playlists;
      res.json({ success: true, playlists })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to add new playlist", errorMessage: err.message })
    }
  })

// delete a video from a playlist
router.route("/:id/:videoId")
  .delete(authUser, async (req, res) => {
    try {
      const { id, videoId } = req.params;
      await VideoUser
        .updateOne({ email: req.email, "playlists._id": id },
          {"$pull": {"playlists.$.videos": { "_id": videoId }}});
      const user = await VideoUser.find({ email: req.email });
      const playlist = user[0].playlists.find(item => item._id === id)
      res.json({ success: true, playlist })
    }
    catch (err) {
      res.status(500).json({ success: false, message: "Unable to delete video from playlist", errorMessage: err.message })
    }
  })

router.route("/:id")
  // get a particular playlist
  .get(authUser, async (req, res) => {
    try {
      const { id } = req.params
      const user = await VideoUser.find({ email: req.email });
      const playlist = user[0].playlists.find(item => item._id === id)
      res.json({ success: true, playlist })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get the playlist", errorMessage: err.message })
    }
  })
  // add a video to a particular playlist
  .post(authUser, async (req, res) => {
    try {
      const { id } = req.params;
      const { video } = req.body;
      await VideoUser
        .updateOne({ email: req.email, "playlists._id": id },
          {
            "$push":
              { "playlists.$.videos": video }
          });

      const user = await VideoUser.find({ email: req.email });
      const playlist = user[0].playlists.find(item => item._id === id)

      res.json({ success: true, playlist })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to add video to playlist", errorMessage: err.message })
    }
  })
  // delete a particular playlist
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await VideoUser.updateOne(
        { email: req.email },
        { $pull: { 'playlists': { _id: id } } });
      let user = await VideoUser.find({ email: req.email });
      const playlists = user[0].playlists;
      res.json({ success: true, playlists })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to delete video from playlist", errorMessage: err.message })
    }
  })

module.exports = router