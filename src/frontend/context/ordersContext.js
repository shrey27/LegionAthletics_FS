import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { ORDERS_API } from "../routes/routes";
import { useAuthCtx } from "./authenticationContext";
import { ordersReducer, orderstDefaultState } from "../helpers/reducers";
import { v4 as uuid } from "uuid";

const OrdersContext = createContext(null);

const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, orderstDefaultState);
  const { ordersLoader, ordersData, ordersError } = state;
  const { token } = useAuthCtx();

  const updateOrders = async (objectData) => {
    try {
      dispatch({ type: "API_REQUEST" });
      const {
        data: { orders },
      } = await axios.post(
        ORDERS_API,
        {
          order: {
            _id: uuid(),
            ...objectData,
          },
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );
      dispatch({ type: "API_RESPONSE", payload: orders });
    } catch (err) {
      console.log("POST-ORDERS-ERROR", err);
      dispatch({ type: "API_FAILURE" });
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      dispatch({ type: "API_REQUEST" });
      try {
        const {
          data: { orders },
        } = await axios.get(ORDERS_API, {
          headers: {
            auth_token: token,
          },
        });
        dispatch({ type: "API_RESPONSE", payload: orders });
      } catch (err) {
        console.log("GET-ORDERS-ERROR", err.message);
        dispatch({ type: "API_FAILURE" });
      }
    };
    if (token) getOrders();
  }, [token]);

  return (
    <OrdersContext.Provider
      value={{
        ordersLoader,
        ordersData,
        ordersError,
        updateOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

const useOrders = () => useContext(OrdersContext);

export { useOrders, OrdersProvider };
