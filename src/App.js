import { useState, useEffect } from 'react';
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
  const [turn, setTurn] = useState('Fruit');  

  const seperateColumns = (e) => {
    setTodoList((prev) => prev.filter((item) => item.name !== e.name));
    if (e.type === 'Fruit') {
      setFruits((prev) => [...prev, e]);
    } else {
      setVegetables((prev) => [...prev, e]);
    }
  }

  const returnBack = (e) => {
    if (e.type === 'Fruit' || e.type === 'Vegetable') {
      setTodoList((prev) => [...prev, e]);
      setFruits((prev) => prev.filter((item) => item.name !== e.name));
      setVegetables((prev) => prev.filter((item) => item.name !== e.name));
    }
  }

  const backFromTable = () => {
    if (turn === 'Fruit' && fruit.length > 0) {
      const itemToReturnFruits = fruit[0]; 
      setFruits((prev) => prev.slice(1)); 
      setTodoList((prev) => [...prev, itemToReturnFruits]); 
      setTurn('Vegetable'); 
    } else if (turn === 'Vegetable' && vegetable.length > 0) {
      const itemToReturnVegetables = vegetable[0]; 
      setVegetables((prev) => prev.slice(1)); 
      setTodoList((prev) => [...prev, itemToReturnVegetables]);
      setTurn('Fruit'); 
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
            <th>To-Do List</th>
            <th>Fruit Column</th>
            <th>Vegetable Column</th>
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
            <td className="column" onClick={() => backFromTable()}>
              <ul>
                {fruit.map((e, index) => (
                  <li key={index} onClick={() => handleButtonReturn(e)}>
                    {e.name}
                  </li>
                ))}
              </ul>
            </td>
            <td className="column" onClick={() => backFromTable()}>
              <ul>
                {vegetable.map((e, index) => (
                  <li key={index} onClick={() => handleButtonReturn(e)}>
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
