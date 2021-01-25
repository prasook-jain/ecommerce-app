import { message } from "antd";
import {
  put,
  all,
  call,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  getCategories,
  getItems,
  getUserOrders,
  isUserValid,
} from "../utility/api";
import {
  UPDATE_CART,
  SET_CATEGORIES,
  ADD_ITEM_TO_CART,
  FETCH_USER_ORDERS,
  SET_CART_TO_STORE,
  FETCH_INITIAL_DATA,
  UPDATE_ITEM_OF_CART,
  REMOVE_ITEM_FROM_CART,
  SET_USER,
  SET_USER_ORDERS,
  PLACE_ORDER,
  ADD_ORDER,
} from "./action";
import { getCart, getUser } from "./selectors";
import { ICart } from "../utility/types";

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

function* fetchUserOrders(action: any) {
  try {
    const userId = action.payload.userId;
    const userOrders = yield call(getUserOrders, userId);
    yield put({ type: SET_USER_ORDERS, orders: userOrders });
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

function* setUserFromStore() {
  try {
    const curUserState = select(getUser);
    const curUser =
      JSON.parse(localStorage.getItem("user") || "") || curUserState;

    const hash_token = curUser.hash_token;
    const validUser = yield isUserValid(hash_token);

    const user = validUser ? curUser : { type: "guest" };

    localStorage.setItem("user", JSON.stringify(user));
    yield put({
      type: SET_USER,
      payload: {
        user,
      },
    });
  } catch (error) {}
}

/**
 * Fetch Initial Data values from backend
 */
function* fetchIntialData() {
  try {
    yield all([call(fetchItems), call(fetchCategories)]);
    yield call(setCartDataToStore);
    yield call(setUserFromStore);
    const user = yield select(getUser);
    if (user.type === "user") {
      const userId = user.id;
      yield call(fetchUserOrders, { payload: userId });
    }
  } catch (error) {}
}

function* placeOrderSaga(action) {
  try {
    // remove values from cart & redux store
    yield localStorage.setItem("cart", JSON.stringify(""));
    yield put({
      type: UPDATE_CART,
      payload: {
        data: {
          last_update_data: new Date(),
          items: [],
        },
      },
    });
    yield put({ type: ADD_ORDER, payload: action.payload.order });
    yield action.payload?.callbackFn?.();
  } catch (error) {
    console.error(error);
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
      message.info("Item already present in the cart.");
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
  yield takeEvery(PLACE_ORDER, placeOrderSaga);
  yield takeEvery(REMOVE_ITEM_FROM_CART, removeItemFromCartSaga);
}

export default mySaga;
