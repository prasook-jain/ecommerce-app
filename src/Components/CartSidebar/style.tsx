import styled from "styled-components";

export const SidebarWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 4rem;
  bottom: 0;
  width: 300px;
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
