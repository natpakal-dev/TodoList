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
  const timersRef = useRef({});
  const pendingItemsRef = useRef({});

  const seperateColumns = (item) => {
    if (itemInColumns.current.has(item.name)) return;
    itemInColumns.current.add(item.name);
    pendingItemsRef.current[item.name] = item;
    setTodoList((prev) => prev.filter((i) => i.name !== item.name));
    if (item.type === 'Fruit') {
      setFruits((prev) => [...prev, item]);
    } else {
      setVegetables((prev) => [...prev, item]);
    }
    const timerId = setTimeout(() => {
      returnBackItem(item, false);
    }, 5000);
    timersRef.current[item.name] = timerId;
  };

  /**
   * @param {object} item
   * @param {boolean} isManual 
   */

  const returnBackItem = (item, isManual = false) => {
    if (timersRef.current[item.name]) {
      clearTimeout(timersRef.current[item.name]);
      delete timersRef.current[item.name];
    }
    if (!itemInColumns.current.has(item.name)) return;
    itemInColumns.current.delete(item.name);
    delete pendingItemsRef.current[item.name];
    setTodoList((prev) => [...prev, item]);
    if (item.type === 'Fruit') {
      setFruits((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetables((prev) => prev.filter((i) => i.name !== item.name));
    }
    if (isManual) {
      let delay = 0
      Object.keys(pendingItemsRef.current).forEach((name) => {
        if (timersRef.current[name]) {
          clearTimeout(timersRef.current[name]);
        }
        delay += 100
        const pendingItem = pendingItemsRef.current[name];
        const newTimerId = setTimeout(() => {
          returnBackItem(pendingItem, false)
        }, 5000 + delay)

        timersRef.current[name] = newTimerId
      });
    }
  };

  const handleButtonReturn = (item) => {
    returnBackItem(item, true);
  };

  const handleButtonClick = (item) => {
    seperateColumns(item);
  };

  return (
    <div className="App">
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
              {todoList.map((item, index) => (
                <button key={index} onClick={() => handleButtonClick(item)}>
                  {item.name}
                </button>
              ))}
            </td>
            <td className="column">
              <ul>
                {fruit.map((item, index) => (
                  <li key={index} onClick={() => handleButtonReturn(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </td>
            <td className="column">
              <ul>
                {vegetable.map((item, index) => (
                  <li key={index} onClick={() => handleButtonReturn(item)}>
                    {item.name}
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
