import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import styled from "styled-components";

import { FETCH_ITEMS } from "../../reduxStore/action";
import { IReduxStore } from "../../reduxStore/reducer";
import { IItem } from "../../utility/types";
import ItemCard from "./ItemCard";

const itemsSelector = createSelector<IReduxStore, any, IItem[]>(
  (state) => state.items,
  (items) => items
);

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem 1rem;
  justify-items: center;
  background-color: #d8d8d8;
`;

const Content = () => {
  const dispatch = useDispatch();
  const items = useSelector(itemsSelector);

  useEffect(() => {
    dispatch({ type: FETCH_ITEMS });
  }, []);

  return (
    <GridDiv>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </GridDiv>
  );
};

export default Content;
