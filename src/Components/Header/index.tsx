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

const HeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  padding: 10px;
  z-index: 1;
  background-color: rosybrown;

  .logo {
    margin-right: auto;
  }

  .right-side {
    margin-left: auto;
  }
`;

const Header: React.FunctionComponent = () => {
  const isLogedIn = false;

  return (
    <HeaderWrapper>
      <div className="logo">Logo</div>
      <button className="right-side">Cart</button>
      <button>{isLogedIn ? "MyAccount" : "Login"}</button>
      {/* Make logout button as well */}
    </HeaderWrapper>
  );
};

export default Header;
