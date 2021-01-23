import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IItem } from "../../../utility/types";

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* background: #b99a9a; */

  &:hover {
    box-shadow: 0 0 3px 3px lightgray;
  }

  & .item-image {
    width: 330px;
  }

  & .item-image-container {
    display: flex;
    justify-content: center;
    height: 400px;
    align-items: center;
    overflow: hidden;
    background: white;
  }

  & .item-details {
    box-sizing: border-box;
    padding: 1rem 1rem;
    display: grid;
    grid-template-areas:
      "item-name item-name"
      "item-price cart-button";

    height: 100px;
    border-top: 1px solid black;
    background-color: white;

    & > .item-name {
      font-size: 14px;
      line-height: 18px;
      height: 36px;
      font-weight: 700;
      grid-area: item-name;
    }

    & > .item-price {
      display: flex;
      align-items: center;
      grid-area: item-price;
      div {
        margin-right: 1rem;
      }
      .item-actual-price {
        color: darkgray;
        text-decoration: line-through;
      }
    }

    & > .cart-button {
      color: white;
      padding: 0.2rem;
      border-radius: 4px;
      background-color: blue;
      grid-area: cart-button;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

interface IItemCardProps {
  item: IItem;
}

const ItemCard: React.FunctionComponent<IItemCardProps> = (props) => {
  const { name, price, image_urls, discount_price } = props.item;

  const dispatch = useDispatch();

  const handleAddCartButton = () => {};

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
          <div className="item-discount-price">{discount_price}</div>
          <div className="item-actual-price">{price}</div>
        </div>
        <button className="cart-button" onClick={handleAddCartButton}>
          Add to Cart
        </button>
      </div>
    </ItemDiv>
  );
};

export default ItemCard;
