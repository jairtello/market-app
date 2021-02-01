import axios from "axios";
import {
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_PRODUCT,
  GET_USER_LOG_IN,
} from "./actions";

const API_URL = process.env.REACT_APP_API_URL;

export const getUserLogIn = (nombre, email, role) => ({
  type: GET_USER_LOG_IN,
  nombre,
  email,
  role,
});

export const getAllUsers = () => (dispatch) => {
  axios.get(`${API_URL}/usuario`).then((resp) => {
    return dispatch({
      type: GET_ALL_USERS,
      users: resp.data,
    });
  });
};

export const getAllProducts = () => (dispatch) => {
  axios.get(`${API_URL}/producto`).then((resp) => {
    return dispatch({
      type: GET_ALL_PRODUCTS,
      products: resp.data,
    });
  });
};

export const getUser = (id) => (dispatch) => {
  axios.get(`${API_URL}/usuario/${id}`).then((resp) => {
    return dispatch({
      type: GET_USER,
      user: resp.data,
    });
  });
};

export const getProduct = (id) => (dispatch) => {
  axios.get(`${API_URL}/producto/${id}`).then((resp) => {
    return dispatch({
      type: GET_PRODUCT,
      product: resp.data,
    });
  });
};
