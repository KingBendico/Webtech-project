import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ItemList from "./ItemList";

describe(ItemList.name, () => {
  it("should render", () => {
    render(<ItemList />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});