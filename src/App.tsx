import { useContext, useEffect, useState } from "react"
import Todo from "./components/Todo"
import { AppContext } from "./context/AppContextInstance"
import { COLORS } from "./constants/colors"
import Color from "./components/Color"

function App() {
  const { todos, color } = useContext(AppContext)
  const [textColor, setTextColor] = useState<string>('')

  useEffect(() => {
    const convert = color.split('-');
    convert.splice(0, 1, "text");
    const bundle = convert.join('-');
    setTextColor(bundle);
    // console.log(textColor);
  }, [color, textColor]);

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

        <div className="w-full flex flex-col justify-center rounded-[25px] px-5 py-5 bg-white font-semibold"
          style={{ boxShadow: `0px -10px 20px -15px rgba(0,0,0,0.8)` }}
        >
          <h2 className="text-lg">Todo this day</h2>
          <ul className="w-full flex flex-col justify-center items-start gap-2 mt-5">
            {todos && todos.map((todo) => <Todo key={todo.id} title={todo.title} /> )}
            {todos && todos.length === 0 && (
              <li className="w-full h-fit px-5 py-4 bg-gray-100/50 rounded-[20px] cursor-pointer">
                No tasks for today
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="w-fit h-fit flex flex-col justify-center items-center gap-2 p-2 bg-white rounded-full shadow-xl ml-10">
        {COLORS.map((color, index) => (
          <Color key={color} color={color} index={index}/>
        ))}
        {/* <span className={`size-8 rounded-full bg-purple-600`}></span>
        <span className={`size-8 rounded-full bg-pink-600`}></span>
        <span className={`size-8 rounded-full bg-sky-600`}></span>
        <span className={`size-8 rounded-full bg-green-600`}></span> */}
      </div>
    </div>
  )
}

export default App
