import styled from "styled-components";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import CategorySection from "./CategorySection";

import { IReduxStore } from "../../reduxStore/reducer";

/**
 * Should be rendered only once or any new category gets added,
 * This contain a major data of the app. Shouldn't be render more than required.
 */
export const getCategories = createSelector<
  IReduxStore,
  Array<{ id: string; name: string }>,
  Array<{ id: string; name: string }>
>(
  (state) =>
    Object.values(state.categories).map((category) => ({
      id: category.id,
      name: category.name,
    })),
  (categories) => categories
);

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 300px;
  grid-template-rows: auto;
  grid-gap: 1rem;
  justify-items: center;
  background-color: white;
`;

const Content = () => {
  const categories = useSelector(getCategories);

  return (
    <ContentWrapper>
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </ContentWrapper>
  );
};

export default Content;
