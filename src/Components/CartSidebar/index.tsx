import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCart, getItemHash } from "../../reduxStore/selectors";
import CartItem from "./CartItem";
import { SidebarWrapper } from "./style";
import { createSelector } from "reselect";
import { IReduxStore } from "../../reduxStore/reducer";
import { ICart, IItemsHash } from "../../utility/types";

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
