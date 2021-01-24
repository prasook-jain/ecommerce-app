import { createSelector } from "reselect";
import { IReduxStore } from "./reducer";
import { ICart, ICategory, IItemsHash, IUser } from "../utility/types";

export const getUser = createSelector<IReduxStore, IUser, IUser>(
  (state) => state.user,
  (user) => user
);

export const getCart = createSelector<IReduxStore, ICart, ICart>(
  (state) => state.cart,
  (cart) => cart
);

export const getItemHash = createSelector<IReduxStore, IItemsHash, IItemsHash>(
  (state) => state.itemsHash,
  (itemsHash) => itemsHash
);
