import { useContext } from "react";
import { AppContext } from "../context/AppContextInstance";
import { motion } from "framer-motion";

interface TodoProps {
  title: string;
  index: number;
  completed?: boolean;
}

const Todo = ({ title, index, completed }: TodoProps) => {
  const { handleTodoComplete, color } = useContext(AppContext);

  return (
    <motion.li
      animate={{ y: [-20, 0], opacity: 1}}
      initial={{ y: 0, opacity: 0}}
      transition={{ delay: 0.2, type: "spring" }}
      className="w-full h-fit flex items-center gap-2 px-5 py-4 bg-gray-100/50 rounded-[20px] hover:shadow transition-all duration-300 cursor-pointer" onClick={() => handleTodoComplete && handleTodoComplete(index)}
    >
      <div className="relative size-5">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className={`absolute stroke-white ${color} rounded-sm ${!completed ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
          >
            <motion.path
              animate={completed ? { pathLength: 1 } : { pathLength: 0 }}
              initial={{ pathLength: 0 }}
              exit={completed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: completed ? "easeIn" : "easeOut",
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
        <div className="size-full border-1 border-neutral-300 shadow-sm rounded-sm"></div>
      </div>
      <div className="relative w-full h-fit flex items-center justify-start">
        <span className={`absolute text-neutral-400 ${completed ? "w-56 h-fit" : "w-0 h-fit"} line-through bg-gray-100/20 whitespace-nowrap overflow-hidden transition-all duration-500`}>{title}</span>
        {title}
      </div>
    </motion.li>
  );
}

export default Todo;