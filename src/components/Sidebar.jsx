import React, { useState } from 'react'
import { Button } from "@/components/ui/button" 
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import PieChartIcon from '@mui/icons-material/PieChart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoIcon from '@mui/icons-material/Info'; 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlusOutlined } from '@ant-design/icons';

const Sidebar = ({width}) => {
    const[showBar,setShowBar]= useState(true); 
    function handleShowBar(){
      setShowBar((prevState)=>!prevState);
    }

  return (
    <>
    {showBar ? <div className={`h-screen  flex flex-col gap-7 md:min-h-screen  md:${width} bg-gradient-to-r from-gray-50 to-slate-300 shadow-xl shadow-black border-x-0 border-black rounded-xl ease-in-out duration-300 translate-x-0`}>
     <div className='flex flex-row p-2 justify-end'>
    <Button onClick={handleShowBar} className='hover:bg-transparent bg-transparent'><CloseIcon className='text-black'/></Button>
     </div> 
    <div className='flex flex-col gap-6 items-center'>
      <h2 className='text-xl font-bold'>General</h2>
    <NavLink to='/Dashboard'><Button className='hover:bg-gradient-to-r from-cyan-300 to-sky-400 flex justify-start md:w-40 text-md text-black text-md bg-transparent'><HomeIcon className='mr-2'/>DashBoard</Button></NavLink>
    </div>
    <div className='flex justify-center'>
      <h2 className=' text-xl font-bold'>Applications</h2>
    </div> 
    <div className='flex gap-4 flex-col items-center'>
      <Accordion type='single'collapsible>
        <AccordionItem className='border-b-0' value='item-1'>
          <AccordionTrigger className='py-0 hover:no-underline'>
          <Button className='hover:bg-transparent flex justify-start md:w-40 text-md text-black text-md bg-transparent'><PieChartIcon className='mr-2'/><p className='hover:no-underline'>Task Master</p></Button>
          </AccordionTrigger>
          <AccordionContent className='flex justify-end pb-1 pt-3 pr-1'>
            <NavLink to='/Createtask'><Button className='flex gap-2 hover:bg-gradient-to-r from-cyan-300 to-sky-400 bg-transparent font-semibold text-black md:w-36'><PlusOutlined/>Create New Task</Button></NavLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='pt-2 border-b-0' value='item-2'>
         <AccordionTrigger className='py-0 hover:no-underline'>
         <Button className='hover:bg-transparent flex justify-start md:w-40 text-md text-black text-md bg-transparent'><ChecklistIcon className='mr-2'/>Client Master</Button>
         </AccordionTrigger>
         <AccordionContent className='flex justify-end pb-1 pt-3 pr-1'>
         <NavLink to='/Clientaddress'><Button className='flex gap-2 hover:bg-gradient-to-r from-cyan-300 to-sky-400 bg-transparent font-semibold text-black md:w-36'><PlusOutlined/>Create Client</Button></NavLink>
         </AccordionContent>
        </AccordionItem>
        <AccordionItem className='pt-2 border-b-0' value='item-3'>
          <AccordionTrigger className='py-0 hover:no-underline'>
          <Button className='hover:bg-transparent flex justify-start md:w-40 text-md text-black text-md bg-transparent'><InfoIcon className='mr-2'/>Assigned Task</Button>
          </AccordionTrigger>
          <AccordionContent className='flex justify-end pb-1 pt-3 pr-1'>
          <NavLink to='/Taskscompleted'><Button className='hover:bg-gradient-to-r from-cyan-300 to-sky-400 bg-transparent font-semibold text-black md:w-32'>Task Employee</Button></NavLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='pt-2 border-b-0' value='item-4'>
          <AccordionTrigger className='py-0 hover:no-underline'>
          <Button className='hover:bg-transparent flex justify-start md:w-40 text-md text-black text-md bg-transparent'><InfoIcon className='mr-2'/>Task Status</Button>
          </AccordionTrigger>
          <AccordionContent className='flex justify-end pb-1 pt-3 pr-1'>
          <NavLink to='/Userstatus'><Button className='hover:bg-gradient-to-r from-cyan-300 to-sky-400 bg-transparent font-semibold text-black md:w-32'>User Status</Button></NavLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    
    
    
    
    </div>
    </div>  : <div className='flex flex-row gap-32 min-h-screen min-w-15'>
    <div className='flex flex-row p-2 justify-start'>
       <Button onClick={handleShowBar} className='hover:bg-transparent bg-transparent text-black'><MenuIcon/></Button>
    </div>
    </div> }
    {/* <div className='flex flex-col gap-32 min-h-screen w-0 md:w-0 bg-neutral-300'>
    <div className='flex flex-row p-2 justify-start'>
       <Button className='bg-blue-500'>Menu</Button>
    </div>
    </div>
    // <div className='flex flex-col gap-32 min-h-screen w-1/4 md:w-1/6 bg-neutral-300'>
    // <div className='flex flex-row p-2 justify-end'>
    //    <Button className='bg-blue-500'>Menu</Button>
    // </div> 
    // <div className='flex flex-row justify-center'>
    //    <Button className='w-40 bg-blue-500'>Create New Task</Button>
    // </div>
    // </div>  */}
    </>
  )
}

export default Sidebar