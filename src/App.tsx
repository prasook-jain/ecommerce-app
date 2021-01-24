import Header from "./Components/Header";
import Cart from "./Components/Cart";
import CartSideBar from "./Components/CartSidebar";
import Footer from "./Components/Footer";
import Content from "./Components/Content";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const isLogedIn = false;
  return (
    <div style={{ marginTop: "4rem" }}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Content />
          <CartSideBar />
        </Route>
        <Route exact path="/checkout">
          {isLogedIn ? <Checkout /> : <Redirect to={"/login"} />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
