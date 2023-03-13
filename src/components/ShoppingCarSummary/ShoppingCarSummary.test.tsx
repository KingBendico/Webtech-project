import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ShoppingCartSummary from "./ShoppingCartSummary";

describe(ShoppingCartSummary.name, () => {
  it("should render", () => {
    render(<ShoppingCartSummary />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});