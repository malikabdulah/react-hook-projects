import { useState } from 'react'
import {Star} from 'lucide-react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [hover, setHover] =useState(0)

  function handleMouseEnter(index){
    setHover(index);
  }
  function handleMouseLeave(index){
    setHover(count);
  }
  function reset(){
    setCount(0);
    setHover(0);
  }

  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen bg-yellow-200 p-4'>
      <div className='flex flex-col items-center justify-center bg-yellow-500 rounded-xl py-10 px-20'>
        <h1 className='text-xl mb-8'>Star Rating</h1>
      <div className='flex flex-row items-center justify-center bg-white py-5 px-10 rounded-xl mb-5'>
      {[1,2,3,4,5,6,7,8,9,10].map((star)=>(
        <Star key={star} className={`cursor-pointer ${count>=star||hover>=star ? "text-yellow-500 fill-yellow-500" : "text-gray-400 hover:fill-yellow-500"} ${"hover:fill-yellow-500"}`} onClick={()=>setCount(star)} onMouseMove={()=>handleMouseEnter(star)} onMouseLeave={()=>handleMouseLeave(star)}/>
      ))}
      </div>
  <button className='bg-yellow-200 rounded-lg text-black hover:bg-yellow-900 hover:text-white py-1 px-2' onClick={reset}>Reset</button>
      </div>
    </div>
    </>
  )
}

export default App
