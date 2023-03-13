import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ItemTable from "./ItemTable";

describe(ItemTable.name, () => {
  it("should render", () => {
    render(<ItemTable />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});