import { useContext } from "react";
import { AppContext } from "../context/AppContextInstance";

interface ColorProps {
  color: string;
  index: number;
}

const Color= ({ color, index }: ColorProps) => {
    const { currIndex, handleColorChange } = useContext(AppContext);
  return (
    <span
        className={`size-8 rounded-full ${color} ${index == currIndex && "border-4 border-black"} cursor-pointer`}
        onClick={() => handleColorChange && handleColorChange(color, index)}
    ></span>
  )
}

export default Color