import {
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_PRODUCT,
  GET_USER_LOG_IN,
  GET_ALL_CATEGORIES,
  GET_ALL_MOVEMENTS,
  GET_MOVEMENT,
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

export const categorieReducer = (state = {}, action) => {
  if (action.type === GET_ALL_CATEGORIES) {
    return {
      ...state,
      categories: action.categories,
    };
  }

  if (action.type === GET_USER) {
    return {
      ...state,
      categorie: action.categorie,
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

export const movementReducer = (state = {}, action) => {
  if (action.type === GET_ALL_MOVEMENTS) {
    return {
      ...state,
      movements: action.movements,
    };
  }

  if (action.type === GET_MOVEMENT) {
    return {
      ...state,
      movement: action.movement,
    };
  }
  return state;
};

// NO USADOS
