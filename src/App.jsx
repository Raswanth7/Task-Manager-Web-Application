import React from 'react'
import Sidebar from './components/Sidebar'
import {Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider } from 'react-router-dom';
// import ClientAddress from './pages/ClientAdd';
import ClientAddress from './components/ClientAddress';
import ClientDetails from './components/ClientDetails';
import AssignedTasks from './components/AssignedTask';
import HomePage from './pages/HomePage';
import Userstatuscomponent from './components/Userstatuscomponent';
import UserStatus from './pages/UserStatus';
import Createtask from './pages/Createtask';
import TaskAdmin from './components/TaskAdmin';
import Loginpage from './components/Loginpage'; 



const router = createBrowserRouter(
  createRoutesFromElements(
  <Route>
  <Route path='/' element={<Loginpage/>}/>
  <Route path='/Dashboard' element={<HomePage/>}/>
  <Route path='/Clientaddress' element={<ClientDetails/>}/>
  <Route path='/Taskscompleted' element={<AssignedTasks/>}/>
  <Route path='/Userstatus' element={<UserStatus/>}/>
  <Route path='/CreateTask' element={<Createtask/>}/>
  </Route>
  
  )
)

const App = () => { 
  return (
  
  <RouterProvider router={router}/>
  )
}

export default App