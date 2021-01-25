import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Button, Divider, List } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import QuantityInput from "../QuantityInput";

import {
  PLACE_ORDER,
  REMOVE_ITEM_FROM_CART,
  UPDATE_ITEM_OF_CART,
} from "../../reduxStore/action";
import { getCart, getItemHash, getUser } from "../../reduxStore/selectors";

const CheckoutWrapper = styled.div`
  margin: 100px;
  margin-bottom: 100px;
  border: 1px solid lightgray;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;

  & h1 {
    margin: 0 auto;
  }
  & .item-details {
    display: flex;
    flex-direction: column;

    & .item-quantity,
    .item-price,
    .item-cost {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    & .item-cost {
      font-weight: 500;
    }

    & .item-remove {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  & .item-title,
  .total-label {
    margin-right: 1rem;
    font-weight: 600;
    font-style: italic;
  }

  & .list-footer {
    display: flex;

    & .total-cost {
      display: flex;
      margin-left: 1rem;
      margin-right: auto;
      font-weight: 800;
    }
    & .button-confirm {
      margin-right: 1rem;
      margin-left: auto;
    }
  }
`;

const Checkout: React.FunctionComponent = (props) => {
  const user = useSelector(getUser);
  const cartData = useSelector(getCart);
  const itemsHash = useSelector(getItemHash);

  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = cartData.items.map((cartItem) => {
    return {
      ...itemsHash[cartItem.itemId],
      quantity: cartItem.quantity,
    };
  });

  const handleConfirm = () => {
    console.log("handleConfirm");
    dispatch({
      type: PLACE_ORDER,
      payload: {
        order: {
          orderId: uuidv4(),
          userId: user.id,
          items: cartItems.map((cartItem) => {
            return {
              price: cartItem.discount_price,
              quantity: cartItem.quantity,
              itemId: cartItem.id,
            };
          }),
        },
        callbackFn: () => {
          history.push("/");
        },
      },
    });
  };

  const totalCost = cartItems.reduce(
    (reducedValue, cartItem) =>
      reducedValue + cartItem.quantity * cartItem.discount_price,
    0
  );

  return (
    <CheckoutWrapper>
      <h1>Checkout</h1>
      <Divider />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={cartItems}
        footer={
          <div className="list-footer">
            <div className="total-cost">
              <div className="total-label">Total Cost :</div>
              <div>₹{totalCost}</div>
            </div>
            <Button
              type="primary"
              shape="round"
              className="button-confirm"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        }
        renderItem={(item) => {
          const removeItem = () => {
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
            <List.Item
              key={item.id}
              extra={
                <img width={272} alt={item.name} src={item.image_urls[0]} />
              }
            >
              <List.Item.Meta title={item.name} />
              <div className="item-details">
                <div className="flex-item item-quantity">
                  <div className="item-title">Quantity :</div>
                  <QuantityInput
                    quantity={item.quantity}
                    updateQuantity={updateQuantity}
                  />
                </div>
                <div className="flex-item item-price">
                  <div className="item-title">Price :</div>₹{item.price}
                  <div className="total-cost"></div>
                </div>
                <div className="flex-item item-cost">
                  <div className="item-title">Total Cost :</div>₹
                  {item.discount_price * item.quantity}
                  <div className="total-cost"></div>
                </div>
                <div className="flex-item item-remove" onClick={removeItem}>
                  Remove
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </CheckoutWrapper>
  );
};

export default Checkout;
