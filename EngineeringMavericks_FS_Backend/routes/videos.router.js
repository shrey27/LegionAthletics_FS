const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json({ success: true, videos })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get videos", errorMessage: err.message    })
  }
})
.post(async (req,res) => {
  try{
      const { video } = req.body;
      const NewVideo = new Video(video);
      await NewVideo.save();
      const videos = await Video.find({});
      res.json({ success: true, videos })
  }
  catch(error){
    res.status(500).json({ success: false, message: "Unable to upload video", errorMessage: err.message    })
  }
 
})

module.exports = router