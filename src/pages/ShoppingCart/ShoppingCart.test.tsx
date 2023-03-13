import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ShoppingCart from "./ShoppingCart";

describe(ShoppingCart.name, () => {
  it("should render", () => {
    render(<ShoppingCart />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});