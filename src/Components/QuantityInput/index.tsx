import { useEffect, useState } from "react";
import styled from "styled-components";

// const shouldDisableDecrement = (quantity: string): boolean => {
//   return inputStrToInt(quantity) === 1 ? false : true;
// };

const inputStrToInt = (value) => parseInt(value || "1", 10);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  input {
    width: 2.5rem;
  }
  button {
    margin: 0 0.4rem;
  }
`;

const QuantityInput = (props: any) => {
  const { quantity, updateQuantity } = props;

  const handleChange = (event) => {
    const value = inputStrToInt(event.target.value);
    updateQuantity(value);
  };

  const handleBlur = () => {
    if (!quantity) {
      updateQuantity(1);
    }
  };

  const increment = () => {
    // const value = quantity + 1;
    updateQuantity(quantity + 1);
  };
  const decrement = () => {
    // const value = quantity;
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  return (
    <Wrapper>
      <button onClick={increment}>+</button>
      <input value={quantity} onBlur={handleBlur} onChange={handleChange} />
      <button onClick={decrement} disabled={false}>
        -
      </button>
    </Wrapper>
  );
};

export default QuantityInput;
