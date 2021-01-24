import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { IReduxStore } from "../../reduxStore/reducer";
import { ICart, IUser } from "../../utility/types";
import styled from "styled-components";
// interface HeaderProps {
//   userDetails: Object;
// }

// const userSelector = createSelector<IReduxStore, any, IUser>(
//   (state) => state.user,
//   (user) => user
// );

// const cartSelector = createSelector<IReduxStore, any, ICart>(
//   (state) => state.cart,
//   (cart) => cart
// );

const CheckoutWrapper = styled.div`
  display: flex;
  height: 4rem;
  padding: 10px;

  .logo {
    margin-right: auto;
  }

  .right-side {
    margin-left: auto;
  }
`;

const Checkout: React.FunctionComponent = (props) => {
  const isLogedIn = false;

  return (
    <CheckoutWrapper>
      <div className="logo">Logo</div>
      <button className="right-side">Cart</button>
      <button>{isLogedIn ? "MyAccount" : "Login"}</button>
    </CheckoutWrapper>
  );
};

export default Checkout;
