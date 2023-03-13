import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Checkout from "./Checkout";

describe(Checkout.name, () => {
  it("should render", () => {
    render(<Checkout />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});