import Header from "./Components/Header";
import CartSideBar from "./Components/CartSidebar";
import Content from "./Components/Content";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "./reduxStore/selectors";

function App() {
  const user = useSelector(getUser);
  const isLogedIn = user.type === "user";
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div style={{ marginTop: "4rem" }}>
            <Header />
            <Content />
            <CartSideBar />
          </div>
        </Route>
        <Route exact path="/checkout">
          <div style={{ marginTop: "4rem" }}>
            <Header />
            {isLogedIn ? <Checkout /> : <Redirect to={"/login"} />}
          </div>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
