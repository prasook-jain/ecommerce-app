import styled from "styled-components";

export const CartItemWrapper = styled.div`
  width: 100%;
  display: grid;
  box-sizing: border-box;
  grid-template-areas:
    "heading heading"
    "aimage price" "aimage quantity"
    "aimage cost"
    "aimage actions";
  cursor: default;
  margin-top: 10px;
  padding: 0.5rem;

  grid-template-columns: 5rem 1fr;
  grid-template-rows: repeat(5, 1.5rem);
  justify-items: end;

  height: 8.5rem;
  border: 1px solid black;

  & .cart-item-image {
    grid-area: aimage;
    display: flex;
    align-items: center;
    width: 5rem;
    /* height: 3rem; */
    overflow: hidden;
    & img {
      padding: 0.2rem;
      width: 100%;
    }
  }
  & .cart-item-heading {
    justify-self: start;
    grid-area: heading;
  }
  & .cart-item-price {
    grid-area: price;
  }
  & .cart-item-quantity {
    display: flex;
    grid-area: quantity;
  }
  & .cart-item-cost {
    grid-area: cost;
  }

  & .cart-item-actions {
    grid-area: actions;
    text-decoration: underline;
    color: #3131ff;
    cursor: pointer;
  }

  & .grid-item > .description {
    box-sizing: border-box;
    font-size: 13px;
    font-style: italic;
    font-weight: 600;
  }
`;
