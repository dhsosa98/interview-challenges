import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    const value = event.target.text.value
    if (!value) return


    setTimeout(()=>{setItems((items) => {
      return items.concat({
        id: +new Date(),
        completed: false,
        text: value,
      })}
  )},1000);

  event.target.text.value=""
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => toggleLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
          >
            <span onClick={() => handleToggle(item.id)}>{item.text}</span> <button onClick={() => handleRemove(item.id)}>[Something X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
