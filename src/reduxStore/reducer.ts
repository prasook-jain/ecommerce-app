import { IOrder, ICart, IUser, IItem } from "../utility/types";
import { SET_ITEMS } from "./action";

export interface IReduxStore {
  cart: ICart;
  user: IUser;
  items: IItem[];
  categories: string[];
  orders: IOrder[];
}

const initialState: IReduxStore = {
  cart: {
    items: [],
  },
  user: {
    type: "guest",
  },
  items: [],
  categories: [],
  orders: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ITEMS:
      state = {
        ...state,
        items: [...action.items],
      };
      return state;
    default:
      return state;
  }
};

export default rootReducer;
