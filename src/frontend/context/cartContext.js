import { createContext, useContext, useReducer, useEffect } from "react";
import { CART, CARTAPI } from "../routes/routes";
import { useAuthCtx } from "./authenticationContext";
import axios from "axios";
import { ToastMessage } from "../components/toast";
import { useNavigate } from "react-router";
import { cartApiReducerFunc, defaultCartState } from "../helpers/reducers";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { cartListData, addItemToCart, updateCartItem, deleteFromCart } =
    useCartAPICtx();

  const addToCart = (item) => {
    const index = cartListData.findIndex((e) => e._id === item._id);
    if (index < 0) {
      addItemToCart(item);
    } else {
      navigate(CART);
    }
  };

  const incQty = (_id) => {
    updateCartItem(_id, true);
  };

  const decQty = (_id, qty) => {
    if (qty <= 1) {
      deleteFromCart(_id);
    } else {
      updateCartItem(_id, false);
    }
  };

  return (
    <CartContext.Provider
      value={{ totalItems: cartListData.length, incQty, decQty, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
const useCartCtx = () => useContext(CartContext);

// Cart API context
const CartAPIContext = createContext();

const CartAPIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartApiReducerFunc, defaultCartState);
  const { addedCartPID } = state;
  const { token } = useAuthCtx();

  const addItemToCart = async (objectData) => {
    dispatch({ type: "API_REQUEST" });
    try {
      const {
        data: { cart },
      } = await axios.post(
        CARTAPI,
        {
          product: {
            ...objectData,
          },
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );

      dispatch({ type: "API_RESPONSE", payload: cart });
      const idArray = cart.map((elem) => elem._id);
      dispatch({ type: "UPDATE_CART_PID", payload: idArray });
      ToastMessage("Product added to cart", "success");
    } catch (err) {
      console.log("POST-CART-ERROR", err);
      dispatch({ type: "API_FAILURE" });
      ToastMessage("Try adding product again", "error");
    }
  };

  const handleOrderPlaced = async () => {
    dispatch({ type: "API_REQUEST" });
    try {
      await axios.delete(CARTAPI + "/all", {
        headers: {
          auth_token: token,
        },
      });
      dispatch({ type: "API_RESPONSE", payload: [] });
      dispatch({ type: "UPDATE_CART_PID", payload: [] });
      ToastMessage("Payment Completed! Order is Placed", "success");
    } catch (err) {
      console.log("Delete all cart Items error", err);
    }
  };

  const deleteFromCart = async (id) => {
    dispatch({ type: "API_REQUEST" });
    try {
      const {
        data: { cart },
      } = await axios.delete(CARTAPI + "/" + id, {
        headers: {
          auth_token: token,
        },
      });
      dispatch({ type: "API_RESPONSE", payload: cart });
      const idArray = cart.map((elem) => elem._id);
      dispatch({ type: "UPDATE_CART_PID", payload: idArray });
    } catch (err) {
      dispatch({ type: "API_FAILURE" });
      console.log("DELETE-CART-ERROR", err);
      ToastMessage("Try deleting product again", "error");
    }
  };

  const updateCartItem = async (id, inc) => {
    dispatch({ type: "API_REQUEST" });
    try {
      const {
        data: { cart },
      } = await axios.put(
        CARTAPI + "/" + id,
        {
          action: {
            type: `${inc ? "increment" : "decrement"}`,
          },
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );

      dispatch({ type: "API_RESPONSE", payload: cart });
      dispatch({ type: "UPDATE_CART_PID" });
      const idArray = cart.map((elem) => elem._id);
      dispatch({ type: "UPDATE_CART_PID", payload: idArray });
      ToastMessage("Quantity was updated", "info");
    } catch (err) {
      dispatch({ type: "API_FAILURE" });
      console.log("DELETE-CART-ERROR", err);
      ToastMessage("Try updating the quantity again", "error");
    }
  };

  useEffect(() => {
    const getCartList = async () => {
      dispatch({ type: "API_REQUEST" });
      try {
        const {
          data: { cart },
        } = await axios.get(CARTAPI, {
          headers: {
            auth_token: token,
          },
        });
        dispatch({ type: "API_RESPONSE", payload: cart });
        const idArray = cart.map((elem) => elem._id);
        dispatch({ type: "UPDATE_CART_PID", payload: idArray });
      } catch (err) {
        console.log("GET-CART-ERROR", err);
        dispatch({ type: "API_FAILURE" });
      }
    };
    if (token) getCartList();
  }, [token]);

  return (
    <CartAPIContext.Provider
      value={{
        ...state,
        dispatch,
        addedCartPID,
        addItemToCart,
        deleteFromCart,
        updateCartItem,
        handleOrderPlaced,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </CartAPIContext.Provider>
  );
};

const useCartAPICtx = () => useContext(CartAPIContext);

export { useCartCtx, useCartAPICtx, CartAPIProvider };
