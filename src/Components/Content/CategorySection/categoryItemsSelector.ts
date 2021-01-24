import { createSelector } from "reselect";
import { IReduxStore } from "../../../reduxStore/reducer";
import { ICategorySection } from "../types";

const getItemsForCategory = (state: IReduxStore, props: ICategorySection) => {
  const categoryObj = state.categories[props.category.id];
  return categoryObj.itemIds.map((itemId) => state.itemsHash[itemId]);
};

const makeCategoryItemsSelector = () => {
  return createSelector(getItemsForCategory, (items) => items);
};

export default makeCategoryItemsSelector;
