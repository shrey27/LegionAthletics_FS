import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  SIGNOUT,
  HOMEPAGE,
  SIGNIN,
  SIGNINAPI,
  SIGNUPAPI,
  UPDATEDETAILS,
} from "../routes/routes";
import { ToastMessage } from "../components";
import {
  useLocalStorage,
  validateSignIn,
  validationSignUp,
  validateUpdateDetails,
  authReducerFunc,
  defaultState,
} from "../helpers";
import { errorStatements } from "../utility/constants";
import { v4 as uuid } from "uuid";

const AuthentiationContext = createContext();

const AuthProvider = ({ children }) => {
  const [disable, setDisable] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [state, dispatch] = useReducer(authReducerFunc, defaultState);
  const {
    email,
    password,
    signUpEmail,
    signUpPassword,
    firstName,
    lastName,
    phone,
    signUpAddress,
    token,
  } = state;

  const navigate = useNavigate();
  const {
    storedName,
    storedSurname,
    storedPhone,
    storedAddress,
    updateLocalStorage,
  } = useLocalStorage();

  const handleUserDetails = (userDetails) => {
    const { firstName, lastName, phone, signUpAddress, email, signUpEmail } =
      userDetails;
    dispatch({
      type: "SIGNUP-FIRSTNAME",
      payload: firstName,
    });
    dispatch({
      type: "SIGNUP-LASTNAME",
      payload: lastName,
    });
    dispatch({
      type: "SIGNUP-PHONE",
      payload: phone,
    });
    dispatch({
      type: "SIGNUP-ADDRESS",
      payload: signUpAddress,
    });
    dispatch({
      type: "SIGNUP-EMAIL",
      payload: signUpEmail ?? email,
    });
    dispatch({
      type: "SIGNIN-EMAIL",
      payload: email,
    });
    dispatch({
      type: "PRIMARY-DETAILS",
      payload: {
        ...userDetails,
        firstname: firstName,
        lastname: lastName,
        address: signUpAddress,
      },
    });
  };
  const handleSignIn = async (navigateTo) => {
    if (validateSignIn(state, dispatch)) {
      try {
        const {
          data: { foundUser, encodedToken },
        } = await axios.post(SIGNINAPI, {
          email,
          password,
        });
        if (foundUser) {
          localStorage.setItem("token", encodedToken);
          delete foundUser.password;
          delete foundUser.wishlist;
          delete foundUser.address;
          delete foundUser.cart;
          delete foundUser.orders;
          localStorage.setItem("userData", JSON.stringify(foundUser));
          dispatch({ type: "TOKEN-SAVED", payload: encodedToken });
          handleUserDetails(foundUser);
          navigate(navigateTo ?? HOMEPAGE, { replace: true });
          ToastMessage("Sign In was Successfull", "success");
        } else {
          throw new Error("User not Found");
        }
      } catch (err) {
        console.log("SIGNIN-ERROR", err);
        dispatch({
          type: "SIGNIN-ERROR",
          payload: errorStatements["SIGN-IN-ERROR"],
        });
        ToastMessage(errorStatements["SIGN-IN-ERROR"], "error");
      }
    } else {
      console.log("failed");
    }
  };

  const handleSignUp = async () => {
    if (validationSignUp(state, dispatch)) {
      try {
        await axios.post(SIGNUPAPI, {
          newUser: {
            _id: uuid(),
            firstName,
            lastName,
            email: signUpEmail,
            password: signUpPassword,
            phone,
            signUpAddress,
          },
        });
        navigate(SIGNIN);
        ToastMessage("Sign Up was Successfull", "success");
      } catch (err) {
        dispatch({ type: "CLEAR-FIELDS" });
        dispatch({
          type: "SIGNUP-ERROR",
          payload: err.message,
        });
        ToastMessage("Sign Up Failed!", "error");
      }
    }
  };

  const handleSignOut = () => {
    dispatch({ type: "TOKEN-REMOVED" });
    localStorage.clear();
    dispatch({ type: "SET-DEFAULT" });
    navigate(SIGNOUT);
    window.location.reload(false);
  };

  const profileUpdateCancelled = () => {
    dispatch({
      type: "SIGNUP-FIRSTNAME",
      payload: storedName,
    });
    dispatch({
      type: "SIGNUP-LASTNAME",
      payload: storedSurname,
    });
    dispatch({ type: "SIGNUP-ADDRESS", payload: storedAddress });
    dispatch({ type: "SIGNUP-PHONE", payload: storedPhone });
    setDisable(true);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (validateUpdateDetails(state, dispatch)) {
      try {
        setDisableSubmit(true);
        const {
          data: { updatedDetails },
        } = await axios.post(
          UPDATEDETAILS,
          {
            userDetails: {
              firstName,
              lastName,
              phone,
              signUpAddress,
            },
          },
          {
            headers: {
              auth_token: token,
            },
          }
        );
        handleUserDetails(updatedDetails);
        updateLocalStorage("firstName", updatedDetails.firstName);
        updateLocalStorage("lastName", updatedDetails.lastName);
        updateLocalStorage("phone", updatedDetails.phone);
        updateLocalStorage("signUpAddress", updatedDetails.signUpAddress);
        updateLocalStorage("email", updatedDetails.email);
        ToastMessage("Details updated Successfully", "success");
        setDisable(true);
        setDisableSubmit(false);
      } catch (err) {
        console.log("profile details error", err);
        profileUpdateCancelled();
        ToastMessage("Profile updation failed", "error");
      }
    } else {
      ToastMessage("Please enter correct details", "error");
    }
  };

  const handleSetPrimaryAddress = (addressObject) => {
    dispatch({ type: "PRIMARY-DETAILS", payload: { ...addressObject } });
    ToastMessage("Primary details updated", "success");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      dispatch({ type: "TOKEN-SAVED", payload: localStorage.getItem("token") });
      const parsedData = JSON.parse(storedData);
      handleUserDetails(parsedData);
    }
  }, []);

  return (
    <AuthentiationContext.Provider
      value={{
        ...state,
        token,
        dispatch,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        handleProfileUpdate,
        profileUpdateCancelled,
        disable,
        setDisable,
        disableSubmit,
        handleSetPrimaryAddress,
      }}
    >
      {children}
    </AuthentiationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthentiationContext);
export { useAuthCtx, AuthProvider };
