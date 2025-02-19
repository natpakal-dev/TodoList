import { useState, useRef } from 'react';
import './App.css';
function App() {
  const [todoList, setTodoList] = useState([
    { type: 'Fruit', name: 'Apple' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Mushroom' },
    { type: 'Fruit', name: 'Banana' },
    { type: 'Vegetable', name: 'Tomato' },
    { type: 'Fruit', name: 'Orange' },
    { type: 'Fruit', name: 'Mango' },
    { type: 'Fruit', name: 'Pineapple' },
    { type: 'Vegetable', name: 'Cucumber' },
    { type: 'Fruit', name: 'Watermelon' },
    { type: 'Vegetable', name: 'Carrot' }
  ]);
  const [fruit, setFruits] = useState([]);
  const [vegetable, setVegetables] = useState([]);
  const itemInColumns = useRef(new Set());

  const seperateColumns = (e) => {
    if (itemInColumns.current.has(e.name)) {
      return;
    }
    itemInColumns.current.add(e.name);
    setTodoList((prev) => prev.filter((item) => item.name !== e.name));
    if (e.type === 'Fruit') {
      setFruits((prev) => [...prev, e]);
    } else {
      setVegetables((prev) => [...prev, e]);
    }
    setTimeout(() => {
      returnBack(e);
    }, 5000);
  }

  const returnBack = (e) => {
    if (!itemInColumns.current.has(e.name)) return;
    itemInColumns.current.delete(e.name);
    setTodoList((prev) => [...prev, e]);
    if (e.type === 'Fruit') {
      setFruits((prev) => prev.filter((item) => item.name !== e.name));
    } else {
      setVegetables((prev) => prev.filter((item) => item.name !== e.name));
    }
  }

  const handleButtonClick = (e) => {
    seperateColumns(e);
  };

  const handleButtonReturn = (e) => {
    returnBack(e);
  };

  return (
    <div className='App'>
      <table className="table-layout">
        <thead>
          <tr>
            <th>Seperate Type</th>
            <th>Fruit</th>
            <th>Vegetable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="todo-list">
              {todoList.map((e, index) => (
                <button key={index} onClick={() => handleButtonClick(e)}>
                  {e.name}
                </button>
              ))}
            </td>
            <td className="column">
              <ul>
                {fruit.map((e, index) => (
                  <li key={index} onClick={() =>handleButtonReturn(e)}>
                    {e.name}
                  </li>
                ))}
              </ul>
            </td>
            <td className="column">
              <ul>
                {vegetable.map((e, index) => (
                  <li key={index} onClick={() =>handleButtonReturn(e)}>
                    {e.name}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
