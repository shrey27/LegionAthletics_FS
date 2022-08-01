const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// support encoded bodies
app.use(cors());

const videosV1 = require('./routes/videos.router.js');
const { authRouter } = require('./routes/authentication.router.js');
const historyv1 = require('./routes/history.router.js');
const likev1 = require('./routes/like.router.js');
const watchlaterv1 = require('./routes/watchlater.router.js');
const playlistv1 = require("./routes/playlist.router.js");

const { initializeDBConnection } = require('./db/db.connect.js');

const PORT = 3020;

// called before any route handler
initializeDBConnection();

app.use('/v1/videos', videosV1);
app.use('/v1/auth', authRouter);
app.use('/v1/history', historyv1);
app.use('/v1/likes', likev1);
app.use('/v1/watchlater', watchlaterv1);
app.use('/v1/playlists', playlistv1);

app.get('/', (req, res) => {
  res.json('Express Server has Started');
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: 'route not found on server, please check',
    });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: 'error occured, see the errMessage key for more details',
      errorMessage: err.message,
    });
});

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});
