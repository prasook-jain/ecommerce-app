import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { IReduxStore } from "../../reduxStore/reducer";
import { ICart, IUser } from "../../utility/types";
import styled from "styled-components";
import { getUser } from "../../reduxStore/selectors";
import { Button, Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import { SET_USER } from "../../reduxStore/action";

const cartItemCountSelector = createSelector<IReduxStore, any, ICart>(
  (state) => state.cart.items.length,
  (length) => length
);

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
    margin-right: 1rem;
  }
`;

const MenuDropdown = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const handleLogout = () => {
    const user: IUser = {
      type: "guest",
    };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: SET_USER,
      payload: {
        user,
      },
    });
  };

  return (
    <Menu>
      <Menu.Item key="profile-details">As {user.name}</Menu.Item>
      <Menu.Item key="order">Orders</Menu.Item>
      <Menu.Item key="logout">
        <Button onClick={handleLogout}>Logout</Button>
      </Menu.Item>
    </Menu>
  );
};

const Header: React.FunctionComponent = () => {
  const history = useHistory();

  const cartItemCount = useSelector(cartItemCountSelector);
  const user = useSelector(getUser);

  const isUserLogedIn = user.type === "user";

  const handleLogIn = () => {
    history.push("/login");
  };

  const goToCheckout = () => {
    history.push("/checkout");
  };

  return (
    <HeaderWrapper>
      <div className="logo">Logo</div>
      <Button
        type="primary"
        shape="round"
        className="right-side"
        onClick={goToCheckout}
      >{`Cart (${cartItemCount})`}</Button>
      {isUserLogedIn ? (
        <Dropdown overlay={<MenuDropdown user={user} />}>
          <Button type="primary" shape="round">
            MyAccount
          </Button>
        </Dropdown>
      ) : (
        <Button type="primary" shape="round" onClick={handleLogIn}>
          Login
        </Button>
      )}
    </HeaderWrapper>
  );
};

export default Header;
