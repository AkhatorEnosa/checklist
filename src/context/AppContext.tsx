import { useEffect, useState } from 'react'
import { ReactNode } from 'react';
import { AppContext } from './AppContextInstance';
import TODOS from '../constants/todos';
import { TodoProps } from '../types/Todo';  // Adjust the path based on your project structure

const savedTodos = localStorage.getItem("todos");
const savedColor = localStorage.getItem("color");
const savedIndex = localStorage.getItem("currIndex");

export function AppProvider({ children }: { children: ReactNode }) {
    const [color, setColor] = useState(savedColor ? savedColor : 'bg-purple-600')
    const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : TODOS);
    const [currIndex, setCurrIndex] = useState(savedIndex ? JSON.parse(savedIndex) : 0);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("color", color);
    localStorage.setItem("currIndex", JSON.stringify(currIndex));
  }, [todos, color, currIndex]);

  const handleColorChange = (newColor: string, newIndex: number) => {
    setColor(newColor);
    setCurrIndex(newIndex);
    localStorage.setItem("color", newColor);
    localStorage.setItem("currIndex", JSON.stringify(newIndex));
  };

  const handleTodoComplete = (index: number) => {
    const updatedTodos = todos.map((todo: TodoProps, i: number) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
    
  return (
    <AppContext.Provider value={{
        color, setColor,
        todos, setTodos,
        currIndex, setCurrIndex,
        handleColorChange,
        handleTodoComplete
    }}>
      {children}
    </AppContext.Provider>
  )
}