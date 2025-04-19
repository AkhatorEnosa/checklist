import { useContext, useEffect, useState } from "react"
import Todo from "./components/Todo"
import { AppContext } from "./context/AppContextInstance"
import { COLORS } from "./constants/colors"
import { motion } from "framer-motion"
import Color from "./components/Color"

function App() {
  const { todos, color } = useContext(AppContext)
  const [textColor, setTextColor] = useState<string>('text-gray-600') // Default

  useEffect(() => {
    if (!color || !color.includes('-')) return
    
    const convert = color.split('-')
    if (convert.length < 2) return // Ensure proper format
    
    convert.splice(0, 1, "text")
    const bundle = convert.join('-')
    // console.log("Setting textColor to:", bundle)
    setTextColor(bundle)
  }, [color])

  const variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2,
        bounce: 0.4,
        ease: "easeInOut",
      } },
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center p-10 bg-white">
      <div className={`w-[26rem] h-fit flex flex-col justify-center items-center ${color} rounded-[35px] shadow-xl transition-colors duration-300`}>
        <div className="w-full flex justify-between items-center px-6 py-5 text-white text-lg font-medium">
          <div className="flex justify-center items-center gap-6">
            <p>Sat, Apr 19</p>
            <span className={`flex justify-center items-center size-6 bg-white ${textColor} font-bold rounded-full text-base cursor-pointer  transition-colors duration-300`}><i className="bi bi-caret-left-fill"></i></span>
            <span className={`flex justify-center items-center size-6 bg-white ${textColor} font-bold rounded-full text-base cursor-pointer opacity-50  transition-colors duration-300`}><i className="bi bi-caret-right-fill"></i></span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <span className="flex justify-center items-center size-5 text-white text-2xl font-bold"><i className="bi bi-box-arrow-up"></i></span>
            <p>Done</p>
          </div>
        </div>

        <motion.div 
          animate={{ y: 0}}
          initial={{ y: 20}}
          transition={{ type: "spring" }}
          className="w-full flex flex-col justify-center rounded-[25px] px-5 py-5 bg-white font-semibold"
          style={{ boxShadow: `0px -10px 20px -20px rgba(0,0,0,0.8)` }}
        >
          <h2 className="text-lg">Todo this day</h2>
          <ul className="w-full flex flex-col justify-center items-start gap-2 mt-5">
            {todos && todos.map((todo, i) => (
              <Todo key={todo.id} title={todo.title} index={i} completed={todo.completed}/> 
            ))}
            {todos && todos.length === 0 && (
              <li className="w-full h-fit px-5 py-4 bg-gray-100/50 rounded-[20px] cursor-pointer">
                No tasks for today
              </li>
            )}
          </ul>
        </motion.div>
      </div>

      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-fit h-fit flex flex-col justify-center items-center gap-2 p-2 bg-white rounded-full shadow-xl ml-10 overflow-hidden">
        {COLORS.map((color, index) => (
          <Color key={color} color={color} index={index}/>
        ))}
      </motion.div>
    </div>
  )
}

export default App
