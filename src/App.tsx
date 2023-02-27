import './App.css'
import ShoppingCart from './pages/ShoppingCart'
import React from 'react';
import {Item} from './types/types'

// interface Item {
//   name: string;
//   quantity: number;
//   price: number;
//   id: number;
// }

// interface Props {
//   items: Item[];
//   onDeleteItem: (index: number) => void;
//   onQuantityChange: (item: Item, newQuantity: number) => void;
// }


function App() {
  return (
    <div>
      <ShoppingCart   />
      
      
    </div>
  );
}

// function ShoppingCart() {
//   return (
//     <ShoppingCartTable />
//   )
// }

// function ShoppingCartTable() {

//   return (
//     <div>
//     <h1>Shopping Cart</h1>
//     <table>
//       <thead>
//         <tr>
//           <th>Item name</th>
//           <th>Price</th>
//           <th>Quantity</th>
//           <th>Delete</th>
//         </tr>
//       </thead>
//       <ItemList />
//       </table>
//       </div>
//   )

// }


// function ItemTable(props: Props) {
//   const { items, onDeleteItem, onQuantityChange } = props;

//   return (
//     <tbody>
//       {items.map((item, index) => (
//         <tr key={item.id}>
//           <td>{item.name}</td>
//           <td>{item.price} kr.</td>
//           <td>
//             <button onClick={() => onQuantityChange(item, item.quantity - 1)}>-</button>
//             {item.quantity}
//             <button onClick={() => onQuantityChange(item, item.quantity + 1)}>+</button>
//           </td>
//           <td>
//             <button onClick={() => onDeleteItem(index)}>X</button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   );
// }

// function ItemList() {
//   const [items, setItems] = useState<Item[]>(cartItems);

//   const handleDeleteItem = (index: number) => {
//     const updatedItems = [...items];
//     updatedItems.splice(index, 1);
//     setItems(updatedItems);
//   };

//   const handleQuantityChange = (item: Item, newQuantity: number) => {
//     const updatedItems = [...items];
//     const index = updatedItems.findIndex(i => i.id === item.id);
//     updatedItems[index].quantity = newQuantity > 0 ? newQuantity : 1;
//     setItems(updatedItems);
//   };

//   return (
//     <ItemTable items={items} onDeleteItem={handleDeleteItem} onQuantityChange={handleQuantityChange} />
//   );
// }


export default App;