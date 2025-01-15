import { useState,useCallback,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const[numberAllowed,setNumberAllowed] = useState(false)
  const[charAllowed,setCharAllowed] = useState(false)
  const[password,setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword  = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed)str+="!@#$%&^*()_+"


    for(let i = 1;i<length;i++){
      const char = Math.floor(Math.random()*str.length+1)

      pass+=str.charAt(char)
    }

    setPassword(pass)
  }, [length,numberAllowed,charAllowed])
  
useEffect(()=>{
  generatePassword()
},[length,numberAllowed,charAllowed])


const copyPasswordToclipboard = ()=>{
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select()
 
}
  return (
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      
   <h1 className='text-white text-center my-3'>Password-Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4'>

    <input type="text"  
    value={password}
     className='outline-none w-full justify-center align-center  py-1 px-3 border-r-2  py-1 px-3' 
     placeholder='Password' 
     readOnly
     ref ={passwordRef}
     />
    <button 
    onClick={copyPasswordToclipboard}
    className='outline-none bg-blue-800 text-white hover:bg-blue-900 px-3 py-0.5 shrink-0'>Copy</button>

</div>
<div className='flex text-sm gap-x-2'>
  <div className='flext items-center gap-x-1'>
    <input type="range" 
    min={6}
    max={100}
    value={length}
    className='cursor-pointer'
    onChange={(e)=>setlength(e.target.value)} 
    name=""
    id=""
    />

    <label htmlFor="length">Length: {length}</label>
  </div>
  <div className='flext items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked = {numberAllowed}
    onChange={()=>{
      setNumberAllowed((prev)=>!prev )
    }}
    />
    <label htmlFor="number">Numbers</label>
  </div>
  <div className='flext items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked = {charAllowed}
    onChange={()=>{
      setCharAllowed((prev)=>!prev )
    }}
    />
    <label htmlFor="Charecter">Charecter</label>
  </div>
</div>
   </div>
   
  )
}

export default App
