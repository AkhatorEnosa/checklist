import { createContext, Dispatch, SetStateAction } from "react";
interface Task {
    id: number;
    title: string;
    completed: boolean;
  }

export const AppContext = createContext<{
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    todos: Task[];
    setTodos: Dispatch<SetStateAction<Task[]>>;
    currIndex: number;
    setCurrIndex: Dispatch<SetStateAction<number>>;
    handleColorChange?: (newColor: string, newIndex: number) => void
}>({
    color: '#fa5454',
    setColor: () => {},
    todos: [],
    setTodos: () => {},
    currIndex: 0,
    setCurrIndex: () => {},
    handleColorChange: () => {}
});