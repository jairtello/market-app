import {
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_PRODUCT,
  GET_USER_LOG_IN,
} from "./actions";

export const loginReducer = (state = {}, action) => {
  if (action.type === GET_USER_LOG_IN) {
    return {
      ...state,
      nombre: action.nombre,
      email: action.email,
      role: action.role,
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
