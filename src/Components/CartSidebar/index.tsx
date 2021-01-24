import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCart, getItemHash } from "../../reduxStore/selectors";
import CartItem from "./CartItem";
import { createSelector } from "reselect";
import { IReduxStore } from "../../reduxStore/reducer";
import { ICart, IItemsHash } from "../../utility/types";

const SidebarWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 4rem;
  bottom: 0;
  width: 280px;
  padding: 0 10px;
  margin-left: 10px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;

  & .list-wrapper {
    height: auto;
    overflow: auto;
  }
  & .details {
    padding: 5px;

    border: 1px solid black;
    margin-top: auto;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;

    & .total {
      align-self: flex-end;
      font-size: 14px;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    & .checkout-button {
      border-radius: 5px;
      padding: 5px;
      height: 2rem;
      background-color: blue;
      color: white;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

const getTotalSelector = createSelector<IReduxStore, ICart, IItemsHash, number>(
  [getCart, getItemHash],
  (cartData, itemsHash) => {
    return cartData.items.reduce(
      (reducedValue, item) =>
        reducedValue + item.quantity * itemsHash[item.itemId].discount_price,
      0
    );
  }
);

const CartSidebar = () => {
  const cartData = useSelector(getCart);
  const totalPrice = useSelector(getTotalSelector);
  const history = useHistory();

  const handleClick = () => {
    history.push("/checkout");
  };

  const checkoutDisabled = cartData.items.length === 0;
  return (
    <SidebarWrapper className="sidebar">
      <div className="list-wrapper">
        {cartData.items.map((item) => {
          return <CartItem key={item.itemId} cartItem={item} />;
        })}
      </div>
      <div className="details">
        <div className="total">Total: {totalPrice}</div>
        <button
          className="checkout-button"
          onClick={handleClick}
          disabled={checkoutDisabled}
        >
          Checkout
        </button>
      </div>
    </SidebarWrapper>
  );
};

export default CartSidebar;
