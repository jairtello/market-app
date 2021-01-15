import axios from "axios";
import {
  GET_ALL_POSTS,
  GET_POST,
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_PRODUCT,
} from "./actions";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllPosts = () => (dispatch) => {
  axios.get(`${API_URL}/posts`).then((resp) => {
    return dispatch({
      type: GET_ALL_POSTS,
      posts: resp.data,
    });
  });
};

export const getAllUsers = () => (dispatch) => {
  axios.get(`${API_URL}/usuarios`).then((resp) => {
    return dispatch({
      type: GET_ALL_USERS,
      users: resp.data,
    });
  });
};

export const getAllProducts = () => (dispatch) => {
  axios.get(`${API_URL}/productos`).then((resp) => {
    return dispatch({
      type: GET_ALL_PRODUCTS,
      products: resp.data,
    });
  });
};

export const getPost = (id) => (dispatch) => {
  axios.get(`${API_URL}/posts/${id}`).then((resp) => {
    return dispatch({
      type: GET_POST,
      post: resp.data,
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
