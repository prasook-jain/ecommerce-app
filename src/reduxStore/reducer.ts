import {
  IOrder,
  ICart,
  IUser,
  IItemsHash,
  ICategoryHash,
} from "../utility/types";
import {
  SET_CART_TO_STORE,
  SET_CATEGORIES,
  SET_ITEMS,
  SET_USER,
  UPDATE_CART,
} from "./action";

export interface IReduxStore {
  cart: ICart;
  user: IUser;
  itemsHash: IItemsHash;
  categories: ICategoryHash;
  orders: IOrder[];
}

const initialState: IReduxStore = {
  cart: {
    last_update_date: new Date(),
    items: [],
  },
  user: {
    type: "guest",
  },
  itemsHash: {},
  categories: {},
  orders: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ITEMS:
      state = {
        ...state,
        itemsHash: action.payload.itemsHash,
      };
      return state;
    case SET_CATEGORIES:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      return state;
    case SET_CART_TO_STORE:
      state = {
        ...state,
        cart: {
          ...state.cart,
          ...action.payload.data,
        },
      };
      return state;
    case UPDATE_CART:
      state = {
        ...state,
        cart: {
          ...state.cart,
          ...action.payload.data,
        },
      };
      return state;
    case SET_USER:
      state = {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };
      return state;
    default:
      return state;
  }
};

export default rootReducer;
