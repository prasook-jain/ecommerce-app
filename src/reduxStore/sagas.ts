import {
  put,
  all,
  call,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { getCategories, getItems, getUserOrders } from "../utility/api";
import { ICart } from "../utility/types";
import {
  UPDATE_ITEM_OF_CART,
  UPDATE_CART,
  FETCH_USER_ORDERS,
  SET_CART_TO_STORE,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CATEGORIES,
  FETCH_INITIAL_DATA,
} from "./action";
import { getCart } from "./selectors";

/**
 * Fetch required itemHash for Homepage from backend.
 */
function* fetchItems() {
  try {
    const itemsHash = yield call(getItems);
    yield put({ type: "SET_ITEMS", payload: { itemsHash } });
  } catch (error) {
    console.log("Error in fetching get items", error);
  }
}

/**
 * Fetch required categories data for Homepage from backend.
 */
function* fetchCategories() {
  try {
    const categories = yield call(getCategories);
    yield put({ type: SET_CATEGORIES, payload: { categories } });
  } catch (error) {
    console.log("Error in fetchCategories saga", error);
  }
}

/**
 * Fetch Initial Data values from fetch items
 */
function* fetchIntialData() {
  try {
    yield all([call(fetchItems), call(fetchCategories)]);
    yield call(setCartDataToStore);
  } catch (error) {}
}

function* fetchUserOrders(action: any) {
  try {
    const userId = action.payload.userId;
    const userOrders = yield call(getUserOrders, userId);
    yield put({ type: "SET_USER_ORDERS", userOrders });
  } catch (error) {
    console.log("Error in fetching user orders");
  }
}

/**
 * Placed in redux because if we save cart values in backend as well, accross
 * browser and take the latest.
 */
function* setCartDataToStore() {
  try {
    const curCartState = select(getCart);
    const cartData =
      JSON.parse(localStorage.getItem("cart") || "") || curCartState;
    console.log(cartData);
    yield put({
      type: UPDATE_CART,
      payload: {
        data: cartData,
      },
    });
  } catch (error) {
    console.log("Error in setting cart data from localstorage");
  }
}

function* addItemToCartSaga(action: any) {
  try {
    const curCartState: ICart = yield select(getCart);
    /** Avoid adding if already present */
    let isAlreadyPresent = false;
    curCartState.items.forEach((item) => {
      if (item.itemId === action.payload.cartItem.itemId) {
        isAlreadyPresent = true;
      }
    });
    if (isAlreadyPresent) {
      return;
    }
    const cartData = {
      last_update_date: new Date() || curCartState.last_update_date,
      items: [...curCartState.items, action.payload.cartItem],
    };

    yield put({ type: UPDATE_CART, payload: { data: cartData } });
    localStorage.setItem("cart", JSON.stringify(cartData));
  } catch (error) {}
}

function* updateItemOfCartSaga(action: any) {
  try {
    const { itemId, quantity } = action.payload;
    const curCartState: ICart = yield select(getCart);

    const updatedItems = curCartState.items.map((cartItem) => {
      if (cartItem.itemId === itemId) {
        return { ...cartItem, quantity };
      } else {
        return cartItem;
      }
    });

    const cartData = {
      last_update_date: new Date() || curCartState.last_update_date,
      items: updatedItems,
    };

    yield put({ type: UPDATE_CART, payload: { data: cartData } });
    localStorage.setItem("cart", JSON.stringify(cartData));
  } catch (error) {}
}

function* removeItemFromCartSaga(action: any) {
  try {
    const curCartState: ICart = yield select(getCart);
    const cartData = {
      last_update_date: new Date() || curCartState.last_update_date,
      items: curCartState.items.filter(
        (item) => item.itemId !== action.payload.itemId
      ),
    };
    yield put({ type: UPDATE_CART, payload: { data: cartData } });
    localStorage.setItem("cart", JSON.stringify(cartData));
  } catch (error) {}
}

function* mySaga() {
  yield takeLatest(FETCH_INITIAL_DATA, fetchIntialData);
  yield takeLatest(FETCH_USER_ORDERS, fetchUserOrders);
  yield takeLatest(SET_CART_TO_STORE, setCartDataToStore);
  yield takeLatest(ADD_ITEM_TO_CART, addItemToCartSaga);
  yield takeEvery(UPDATE_ITEM_OF_CART, updateItemOfCartSaga);
  yield takeEvery(REMOVE_ITEM_FROM_CART, removeItemFromCartSaga);
}

export default mySaga;
