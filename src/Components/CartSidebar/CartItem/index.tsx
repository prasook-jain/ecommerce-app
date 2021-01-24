import { connect, useDispatch } from "react-redux";
import { CartItemWrapper } from "./style";
import {
  REMOVE_ITEM_FROM_CART,
  UPDATE_ITEM_OF_CART,
} from "../../../reduxStore/action";
import { IReduxStore } from "../../../reduxStore/reducer";
import { ICartItem, IItem } from "../../../utility/types";
import QuantityInput from "../../QuantityInput";

interface ICartItemProps {
  item: IItem;
  quantity: number;
}

/** CSS ellipses is complex to handle with grid-item  */
const ellipsify = (str: string, length: number) => {
  return str.length > length ? `${str.slice(0, length)} ...` : str;
};

const CartItem: React.FC<ICartItemProps> = (props) => {
  const { item, quantity } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: {
        itemId: item.id,
      },
    });
  };

  const updateQuantity = (value) => {
    dispatch({
      type: UPDATE_ITEM_OF_CART,
      payload: {
        itemId: item.id,
        quantity: value,
      },
    });
  };

  return (
    <CartItemWrapper>
      <div className="cart-item-heading grid-item">
        <div>
          <div>{ellipsify(item.name, 30)}</div>
        </div>
      </div>
      <div className="cart-item-image grid-item">
        <img src={item.image_urls[0]} alt={item.name} />
      </div>
      <div className="cart-item-price grid-item">
        <span className="description">Price : </span>
        {item.discount_price}
      </div>
      <div className="cart-item-quantity grid-item">
        <span className="description">Quantity</span>
        <QuantityInput quantity={quantity} updateQuantity={updateQuantity} />
      </div>
      <div className="cart-item-cost grid-item">
        <span className="description">Total Cost : </span>
        {item.discount_price * quantity}
      </div>
      <div className="cart-item-actions grid-item" onClick={handleClick}>
        Remove
      </div>
    </CartItemWrapper>
  );
};

const mapStateToProps = (
  state: IReduxStore,
  props: { cartItem: ICartItem }
) => {
  const {
    cartItem: { itemId, quantity },
  } = props;
  return { item: state.itemsHash[itemId], quantity };
};

export default connect(mapStateToProps)(CartItem);
