import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import mySaga from "./sagas";
import rootReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySaga);

export default store;
