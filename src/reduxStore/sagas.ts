import { takeLatest, put, call } from "redux-saga/effects";
import { getItems, getUserOrders } from "../utility/api";
import { FETCH_ITEMS, FETCH_USER_ORDERS } from "./action";

function* fetchItems() {
  try {
    const items = yield call(getItems);
    console.warn({ items });
    yield put({ type: "SET_ITEMS", items });
  } catch (error) {
    console.log("Error in fetching get items", error);
  }
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

function* mySaga() {
  yield takeLatest(FETCH_ITEMS, fetchItems);
  yield takeLatest(FETCH_USER_ORDERS, fetchUserOrders);
  // yield takeLatest("FETCH_USER", fetchUser);
}

export default mySaga;
