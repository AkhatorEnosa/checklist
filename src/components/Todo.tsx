import { useState } from "react";

interface TodoProps {
  title: string;
}

const Todo = ({ title }: TodoProps) => {
    const [marked, setMarked] = useState(false)

  return (
    <li className="relative w-full h-fit px-5 py-4 bg-gray-100/50 rounded-[20px] cursor-pointer" onClick={() => setMarked(!marked)}>
      <span className={`absolute text-neutral-400 ${marked ? "w-56 h-fit" : "w-0 h-fit"} line-through bg-gray-100/20 whitespace-nowrap overflow-hidden transition-all duration-500`}>{title}</span>
      {title}
    </li>
  );
}

export default Todo;