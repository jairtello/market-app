import axios from "axios";
import {
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_PRODUCT,
  GET_USER_LOG_IN,
  GET_ALL_CATEGORIES,
  GET_ALL_MOVEMENTS,
} from "./actions";

const API_URL = process.env.REACT_APP_API_URL;

export const getUserLogIn = (nombre, email, role) => ({
  type: GET_USER_LOG_IN,
  nombre,
  email,
  role,
});

export const getAllUsers = () => (dispatch) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: {
      token,
    },
  };
  axios
    .get(`${API_URL}/usuario`, config)
    .then((resp) => {
      return dispatch({
        type: GET_ALL_USERS,
        users: resp.data.usuarios,
      });
    })
    .catch(console.log);
};

export const getAllCategories = () => (dispatch) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: {
      token,
    },
  };
  axios
    .get(`${API_URL}/categoria`, config)
    .then((resp) => {
      return dispatch({
        type: GET_ALL_CATEGORIES,
        categories: resp.data.categorias,
      });
    })
    .catch(console.log);
};

export const getAllProducts = () => (dispatch) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: {
      token,
    },
  };

  axios.get(`${API_URL}/producto`, config).then((resp) => {
    return dispatch({
      type: GET_ALL_PRODUCTS,
      products: resp.data.productos,
    });
  });
};

export const getAllMovements = () => (dispatch) => {
  let token = localStorage.getItem("token");

  let config = {
    headers: {
      token,
    },
  };

  axios.get(`${API_URL}/movimiento`, config).then((resp) => {
    return dispatch({
      type: GET_ALL_MOVEMENTS,
      movements: resp.data.movimientos,
    });
  });
};

// TODAVIA NO USADOS
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
