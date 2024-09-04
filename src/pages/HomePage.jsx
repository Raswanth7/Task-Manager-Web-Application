import React from 'react'
import Sidebar from '@/components/Sidebar'
import Homecomponent from '@/components/Homecomponent'

const HomePage = () => {
  return (
    <div className='min-h-fit bg-gradient-to-br from-[#f0f4f8] to-[#d3e0ea] flex flex-row md:gap-x-80'>
    <Sidebar width='w-1/6'/>
    <Homecomponent/>
   </div> 
  )
}

export default HomePage