import styled from "styled-components";

export const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;

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
