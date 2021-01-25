import React from "react";
import mockBackend from "../../../../utility/mock.json";
import { fireEvent, render, screen } from "@testing-library/react";
import ItemCard from "..";
import { ADD_ITEM_TO_CART } from "../../../../reduxStore/action";

const mockProps = {
  item: mockBackend["itemsHash"].BDDEPW5FY7FGRGEZ,
};

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("ItemCard : ", () => {
  test("renders correctly, snapshot test", () => {
    const { container } = render(<ItemCard item={mockProps.item} />);
    expect(container).toMatchSnapshot();
  });

  test("Add Cart dispatch correct actoin", () => {
    render(<ItemCard item={mockProps.item} />);

    const addToCartButtonEl = screen.getByRole("button", {
      name: "Add to Cart",
    });
    fireEvent.click(addToCartButtonEl);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: ADD_ITEM_TO_CART,
      payload: {
        cartItem: { itemId: mockProps.item.id, quantity: 1 },
      },
    });
    mockDispatch.mockReset();
  });
});
