import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import ShoppingCartTable from "./ShoppingCartTable";



describe(ShoppingCartTable.name, () => {
  it("should render", () => {
    const items:any = []
  const setItems = () =>{

  }
    render(<ShoppingCartTable items={items} setItems={setItems} />);
    expect(screen.getByText("Indkøbskurv")).toBeInTheDocument();
    expect(screen.getByText("Vare")).toBeInTheDocument();
    expect(screen.getByText("Stykpris")).toBeInTheDocument();
    expect(screen.getByText("Antal")).toBeInTheDocument();
    expect(screen.getByText("Total pris")).toBeInTheDocument();
    expect(screen.getByText("Slet")).toBeInTheDocument();
    expect(screen.getByText("Gaveindpakning")).toBeInTheDocument();
    expect(screen.getByText("Tilbagevendende ordre")).toBeInTheDocument();
  });
});