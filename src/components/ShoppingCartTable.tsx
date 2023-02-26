import ItemList from './ItemList'

export default function ShoppingCartTable() {

    return (
      <div>
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <ItemList />
        </table>
        </div>
    )
  
  }