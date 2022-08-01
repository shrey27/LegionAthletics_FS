const express = require("express");
const authRouter = express.Router();
const { VideoUser } = require("../models/user.model")
const jwt = require('jsonwebtoken');
const mySecret = process.env['SECRET_KEY']

authRouter.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;
  const resp = await VideoUser.find({ email: email, password: password });
  let foundUser = resp[0];
  try {
    if (foundUser?.email === email) {
      let encodedToken = jwt.sign({ email }, mySecret, { expiresIn: '2h' });
      res.status(201).json({ success: true, message: 'You are logged In', encodedToken, foundUser })
    }
    else {
      throw 'user not found';
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error ?? 'User not found' })
  }
})

authRouter.route("/signup").post(async (req, res) => {
  try {
    const { newUser } = req.body;
    const signUpEmail = newUser.email;
    const foundUser = await VideoUser.find({ email: signUpEmail });
    if (!foundUser[0]) {
      const NewUser = new VideoUser(newUser);
      const createdUser = await NewUser.save();
      let encodedToken = jwt.sign({ signUpEmail }, mySecret, { expiresIn: '2h' });
      res.status(201).json({ success: true, message: 'You have Signed Up successfully', createdUser, encodedToken })
    }
    else {
      throw new Error('User already exists !');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message ?? 'Sign Up Failed !' })
  }
})

authRouter.route("/update").post(authUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const currentEmail = req.email;
    await VideoUser.updateOne({ email: currentEmail }, {
      $set: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        signUpAddress: userDetails.signUpAddress
      }
    });
    const foundUser = await VideoUser.find({ email: currentEmail })
    if (foundUser) {
      const updatedDetails = {
        firstName: foundUser[0].firstName,
        lastName: foundUser[0].lastName,
        phone: foundUser[0].phone,
        email: currentEmail,
        signUpAddress: foundUser[0].signUpAddress
      }
      res.status(201).json({ success: true, message: 'Details updated successfully', updatedDetails })
    }
    else {
      throw new Error('Details were not updated !');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message ?? 'Try Again later!' })
  }
})

function authUser(req, res, next) {
  try {
    let decodedInfo = jwt.verify(req.headers.auth_token, mySecret);
    console.log('User is verified')
    req.email = decodedInfo.email;
    next();
  }
  catch (err) {
    res.status(401).json({ success: false, message: 'Unauthorised User(Invalid Token found)' })
  }
}

module.exports = { authRouter, authUser }