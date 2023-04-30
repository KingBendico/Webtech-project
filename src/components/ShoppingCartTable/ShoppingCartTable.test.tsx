import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ShoppingCartTable from "./ShoppingCartTable";

describe(ShoppingCartTable.name, () => {
  it("should render", () => {
    render(<ShoppingCartTable />);
    expect(screen.getByText("Vare")).toBeInTheDocument();
    expect(screen.getByText("Stykpris")).toBeInTheDocument();
    expect(screen.getByText("Antal")).toBeInTheDocument();
    expect(screen.getByText("Slet")).toBeInTheDocument();
    expect(screen.getByText("Gaveindpakning")).toBeInTheDocument();
    expect(screen.getByText("Tilbagevendende ordre")).toBeInTheDocument();
  });
});
