import { connect } from "react-redux";
import styled from "styled-components";
import { IReduxStore } from "../../../reduxStore/reducer";
import { IItem } from "../../../utility/types";
import ItemCard from "../ItemCard";
import makeCategoryItemsSelector from "./categoryItemsSelector";

const GridDiv = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
  justify-items: center;
  background-color: #d8d8d8;
`;

const CategorySection: React.FunctionComponent<any> = (props) => {
  const { categoryItems } = props;
  return (
    <div>
      <h2>{props.category.name}</h2>
      <GridDiv>
        {categoryItems.map((item: IItem) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </GridDiv>
    </div>
  );
};

/**
 * New Memoized selector needed for each Instance of CategorySection, so that
 * each instance only render when required.
 */
const makeMapStateToProps = () => {
  const categoryItemsSelector = makeCategoryItemsSelector();
  const mapStateToProps = (state: IReduxStore, props) => {
    return {
      categoryItems: categoryItemsSelector(state, props),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(CategorySection);
