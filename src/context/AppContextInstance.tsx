import { createContext, Dispatch, SetStateAction } from "react";
import { TodoProps } from "../types/Todo";

export const AppContext = createContext<{
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    todos: TodoProps[];
    setTodos: Dispatch<SetStateAction<TodoProps[]>>;
    currIndex: number;
    setCurrIndex: Dispatch<SetStateAction<number>>;
    handleColorChange?: (newColor: string, newIndex: number) => void;
    handleTodoComplete?: (index: number) => void;
}>({
    color: '#fa5454',
    setColor: () => {},
    todos: [],
    setTodos: () => {},
    currIndex: 0,
    setCurrIndex: () => {},
    handleColorChange: () => {},
    handleTodoComplete: () => {}
});