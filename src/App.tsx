import { useContext, useEffect, useState } from "react"
import Todo from "./components/Todo"
import { AppContext } from "./context/AppContextInstance"
import { COLORS } from "./constants/colors"
import { motion } from "framer-motion"
import Color from "./components/Color"

function App() {
  const { todos, color, handleAddTodo } = useContext(AppContext)
  const [textColor, setTextColor] = useState<string>('') // Default
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState("")

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
    <div className="w-screen h-screen flex flex-col md:flex-row justify-center items-center p-10 gap-10 bg-white">
      <div className={`w-[26rem] h-fit flex flex-col justify-center items-center ${color} rounded-[35px] shadow-xl transition-colors duration-300`}>
        <div className="w-full flex justify-between items-center px-6 py-5 text-white text-lg font-medium">
          <div className="flex justify-center items-center gap-6">
            <p>Sat, Apr 19</p>
            <span className={`flex justify-center items-center size-6 bg-white ${textColor} font-bold rounded-full text-base cursor-pointer  transition-colors duration-300`}><i className="bi bi-caret-left-fill"></i></span>
            <span className={`flex justify-center items-center size-6 bg-white ${textColor} font-bold rounded-full text-base cursor-pointer opacity-50  transition-colors duration-300`}><i className="bi bi-caret-right-fill"></i></span>
          </div>
          {!showInput && <div className="flex justify-center items-center gap-6">
            <span className={`flex justify-center items-center bg-white size-6 ${textColor} p-4 rounded-full text-2xl font-bold cursor-pointer`}
              onClick={() => setShowInput(true)}
            ><i className="bi bi-plus-lg"></i></span>
            {/* <p>Done</p> */}
          </div>}
        </div>

        <motion.div 
          animate={{ y: 0, boxShadow: `0px -15px 20px -20px rgba(0,0,0,0.8)` }}
          initial={{ y: 20}}
          transition={{ type: "spring" }}
          className="w-full max-h-[60vh] flex flex-col justify-center rounded-[25px] px-5 py-5 gap-2 md:gap-5 bg-white font-semibold overflow-scroll"
        >
          <h2 className="w-full bg-white sticky flex items-center top-0 md:text-lg pb-4 z-40">{showInput ? "Write a Todo" : "Todo this day"}</h2>
          {
            !showInput ? 
            <ul className="w-full flex flex-col justify-center items-start gap-2">
              {todos && todos.map((todo, i) => (
                <Todo key={todo.id} title={todo.title} index={i} completed={todo.completed}/> 
              ))}
              {todos && todos.length === 0 && (
                <li className="w-full h-fit px-5 py-4 bg-gray-100/50 rounded-[20px] cursor-pointer">
                  No tasks for today
                </li>
              )}
            </ul> 
            
            :

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              exit={{ opacity: 0, y: -100 }}
              className={`w-full h-fit flex flex-col justify-center items-center gap-2 transition-opacity duration-500`}
            >
              <input 
                type="text" 
                className={`w-full h-fit flex items-center gap-2 px-5 py-4 bg-gray-100/50 rounded-[20px] shadow border-[1px] border-gray-200 transition-all duration-300 cursor-pointer`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Write a todo..."
              />
              <div className="w-full h-fit flex justify-center items-center gap-2 mt-2">
                <button className={`w-fit h-fit flex justify-center items-center gap-2 px-5 py-4 text-white rounded-[20px] shadow border-[1px] border-gray-200 transition-all duration-300 cursor-pointer bg-neutral-800 text-sm`}
                  onClick={() => setShowInput(false)}
                >
                  <i className="bi bi-x-lg"></i>
                  Cancel
                </button>
                <button className={`w-fit h-fit flex justify-center items-center gap-2 px-5 py-4 text-white rounded-[20px] shadow border-[1px] border-gray-200 transition-all duration-300 cursor-pointer text-sm ${color}`}
                  onClick={() => {
                    if(handleAddTodo) handleAddTodo({ id: Date.now(), title: inputValue, completed: false });
                    setShowInput(false)
                  }}
                >
                  <i className="bi bi-check-lg"></i>
                  Add
                </button>
              </div>
            </motion.div>
          }
        </motion.div>
        
      </div>

      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-fit h-fit flex md:flex-col justify-center items-center gap-2 p-2 bg-white rounded-full shadow-xl md:ml-10 overflow-hidden">
        {COLORS.map((color, index) => (
          <Color key={color} color={color} index={index}/>
        ))}
      </motion.div>
    </div>
  )
}

export default App
