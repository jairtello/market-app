import {
  GET_ALL_POSTS,
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_POST,
  GET_USER,
  GET_PRODUCT
} from "./actions";

export const postReducer = (state = {}, action) => {
  if (action.type === GET_ALL_POSTS) {
    return {
      ...state,
      posts: action.posts,
    };
  }

  if (action.type === GET_POST) {
    return {
      ...state,
      post: action.post,
    };
  }

  return state;
};

export const userReducer = (state = {}, action) => {
  if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      users: action.users,
    };
  }

  if (action.type === GET_USER) {
    return {
      ...state,
      user: action.user,
    };
  }

  return state;
};

export const productReducer = (state = {}, action) => {
  if (action.type === GET_ALL_PRODUCTS) {
    return {
      ...state,
      products: action.products,
    };
  }

  if (action.type === GET_PRODUCT) {
    return {
      ...state,
      product: action.product,
    };
  }
  return state;
};
