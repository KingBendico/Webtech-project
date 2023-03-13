import { render, screen} from "@testing-library/react";
import  React  from "react";
import { describe, expect, it } from "vitest";
import ItemList from "./ItemList";

describe(ItemList.name, () => {

  it("should render", () => {
    const itemList:any = []
  const setItems = () =>{

  }
    render( <ItemList items={itemList} setItems={setItems}/>);
    expect(screen.getByText("Din indkøbskurv er tom")).toBeInTheDocument();
  });
});