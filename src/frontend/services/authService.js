import axios from 'axios';
import { SIGNINAPI, SIGNUPAPI } from '../routes/routes';

export const handleSignInApi = async (state) => {
  const { email, password } = state;
  try {
    const {
      data: { foundUser, encodedToken }
    } = await axios.post(SIGNINAPI, {
      email,
      password
    });
    if (foundUser) {
      return { foundUser, encodedToken };
    } else {
      throw new Error('User not Found');
    }
  } catch (err) {
    console.log('SIGNIN-ERROR', err);
  }
};

export const handleSignUpApi = async (state) => {
  const { username, signUpEmail, signUpPassword } = state;
  try {
    const {
      data: { createdUser, encodedToken }
    } = await axios.post(SIGNUPAPI, {
      firstName: username.split(' ')[0],
      lastName: username.split(' ')[1],
      signUpEmail,
      signUpPassword
    });
    return { createdUser, encodedToken };
  } catch (err) {
    console.log(err);
  }
};
