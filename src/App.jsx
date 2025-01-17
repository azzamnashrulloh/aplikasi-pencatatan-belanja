import Header from "./components/Header.Jsx";
import Form from "./components/Form";
import GroceryList from "./components/GroceryList";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form onAddItem={handleAddItem} />
        <GroceryList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
          onClearItems={handleClearItems}
        />
        <Footer items={items} />
      </div>
    </>
  );

  function Footer({ items }) {
    if (items.length === 0)
      return <footer className="stats">Daftar belanjaan masih kosong</footer>;

    const totalItems = items.length;
    const checkedItems = items.filter((item) => item.checked).length;
    const percentage = Math.round((checkedItems / totalItems) * 100);
    return (
      <footer className="stats">
        Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah
        dibeli ({percentage}%)
      </footer>
    );
  }
}
