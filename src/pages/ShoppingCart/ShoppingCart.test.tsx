import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Item } from "../../types/types";
import ShoppingCart from "./ShoppingCart";

describe(ShoppingCart.name, () => {
  it("should render", () => {
    render(<ShoppingCart items={[]} setItems={function (items: Item[]): void {
      throw new Error("Function not implemented.");
    } } />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});