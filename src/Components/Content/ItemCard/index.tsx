import { useDispatch } from "react-redux";
import { ItemDiv } from "./style";
import { ADD_ITEM_TO_CART } from "../../../reduxStore/action";
import { IItem } from "../../../utility/types";

export interface IItemCardProps {
  item: IItem;
}

const ItemCard: React.FunctionComponent<IItemCardProps> = (props) => {
  const { id, name, price, image_urls, discount_price } = props.item;

  const dispatch = useDispatch();

  const handleAddCartButton = () => {
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {
        cartItem: { itemId: id, quantity: 1 },
      },
    });
  };

  const itemName = name.length > 75 ? name.slice(0, 75) + "..." : name;
  return (
    <ItemDiv>
      <div className="item-image-container">
        <img className="item-image" src={image_urls[0]} alt={name} />
      </div>
      <div className="item-details">
        <div className="item-name" title={name}>
          {itemName}
        </div>
        <div className="item-price">
          <div className="item-discount-price">₹{discount_price}</div>
          <div className="item-actual-price">₹{price}</div>
        </div>
        <button className="cart-button" onClick={handleAddCartButton}>
          Add to Cart
        </button>
      </div>
    </ItemDiv>
  );
};

export default ItemCard;
