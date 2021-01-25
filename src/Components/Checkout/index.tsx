import { Button, List } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCart, getItemHash } from "../../reduxStore/selectors";

const CheckoutWrapper = styled.div``;

const Checkout: React.FunctionComponent = (props) => {
  const cartData = useSelector(getCart);
  const itemsHash = useSelector(getItemHash);

  const cartItems = cartData.items.map((cartItem) => {
    return {
      ...itemsHash[cartItem.itemId],
      quantity: cartItem.quantity,
    };
  });

  const handleConfirm = () => {
    console.log("handleConfirm");
  };

  return (
    <CheckoutWrapper>
      <h1>Checkout</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={cartItems}
        footer={<Button onClick={handleConfirm}>Confirm</Button>}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={<img width={272} alt={item.name} src={item.image_urls[0]} />}
          >
            <List.Item.Meta title={item.name} />
            {item.name}
          </List.Item>
        )}
      />
    </CheckoutWrapper>
  );
};

export default Checkout;
