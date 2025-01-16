import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home/Home.jsx'
import About from './components/About/About.jsx'
import User from './components/User/User.jsx'
import Github from './components/Github/Github.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
  <Route  path='' element={<Home/>}/>
   <Route  path='about/' element={<About/>}/>

  <Route path='user/' element={<User/>}>
   <Route path=':userid' element = {<User/>}/>
  </Route>
  <Route path='github' element={<Github/>}/>

   <Route path='*' element ={<div>404</div>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
