import { v4 as uuid } from 'uuid';
import { Response } from 'miragejs';
import { formatDate, requiresAuth } from '../utils/authUtils';
const sign = require('jwt-encode');
/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, email, password}
 * */

export const signupHandler = function (schema, request) {
  const { email, password, signUpAddress, ...rest } = JSON.parse(
    request.requestBody
  );
  try {
    // check if email already exists
    const foundUser = schema.users.findBy({ email });
    if (foundUser) {
      return new Response(
        422,
        {},
        {
          errors: ['Unprocessable Entity. Email Already Exists.']
        }
      );
    }
    const _id = uuid();
    const newUser = {
      _id,
      email,
      password,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      ...rest,
      cart: [],
      wishlist: [],
      address:[],
      signUpAddress
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign({ _id, email }, process.env.REACT_APP_JWT_SECRET);
    return new Response(201, {}, { createdUser, encodedToken });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup/:userId
 * body contains {firstName, lastName, email, password, address, phone}
 * */

export const signupUpdateHandler = function (schema, request) {
  const { email, signUpAddress, phone, firstName, lastName, signUpEmail } =
    JSON.parse(request.requestBody);
  const userId = requiresAuth.call(this, request);
  try {
    // check if email already exists
    const foundUser = schema.users.findBy({ email });
    const foundUser2 = schema.users.findBy({ signUpEmail });
    if (!foundUser && !foundUser2) {
      return new Response(
        404,
        {},
        {
          errors: ['Account not Found']
        }
      );
    }
    this.db.users.update(
      { _id: userId },
      { signUpAddress },
      { phone },
      { firstName },
      { lastName }
    );
    return new Response(
      201,
      {},
      {
        updatedDetails: {
          signUpAddress,
          phone,
          firstName,
          lastName
        }
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = function (schema, request) {
  const { email, password } = JSON.parse(request.requestBody);
  try {
    const foundUser = schema.users.findBy({ email });
    if (!foundUser) {
      return new Response(
        404,
        {},
        { errors: ['The email you entered is not Registered. Not Found error'] }
      );
    }
    if (password === foundUser.password) {
      const encodedToken = sign(
        { _id: foundUser._id, email },
        process.env.REACT_APP_JWT_SECRET
      );
      foundUser.password = undefined;
      return new Response(200, {}, { foundUser, encodedToken });
    }
    new Response(
      401,
      {},
      {
        errors: [
          'The credentials you entered are invalid. Unauthorized access error.'
        ]
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};
