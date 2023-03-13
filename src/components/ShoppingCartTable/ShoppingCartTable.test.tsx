import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ShoppingCartTable from "./ShoppingCartTable";

describe(ShoppingCartTable.name, () => {
  it("should render", () => {
    render(<ShoppingCartTable />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});