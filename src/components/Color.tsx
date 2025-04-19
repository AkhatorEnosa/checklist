import { useContext } from "react";
import { AppContext } from "../context/AppContextInstance";
import { motion } from "framer-motion";

interface ColorProps {
  color: string;
  index: number;
}

const variants = {
  hidden: { opacity: 0, x: 400 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Color= ({ color, index }: ColorProps) => {
    const { currIndex, handleColorChange } = useContext(AppContext);
  return (
    <motion.span
        variants={variants}
        className={`size-8 rounded-full ${color} ${index == currIndex && "border-4 border-black shadow"} cursor-pointer`}
        onClick={() => handleColorChange && handleColorChange(color, index)}
    ></motion.span>
  )
}

export default Color