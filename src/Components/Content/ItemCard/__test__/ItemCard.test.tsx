import React from "react";
import mockBackend from "../../../../utility/mock.json";

import { render, screen } from "@testing-library/react";
import ItemCard, { IItemCardProps } from "..";

const mockProps = {
  item: mockBackend["itemsHash"].BDDEPW5FY7FGRGEZ,
};

const mockDispatch = jest.fn();
jest.mock("react-redux", () => {
  useDispatch: () => mockDispatch;
});

describe("ItemCard : ", () => {
  test("renders correctly, snapshot test", () => {
    const { container } = render(<ItemCard item={mockProps.item} />);
    expect(container).toMatchSnapshot();
  });
});
