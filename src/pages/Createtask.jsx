import TaskForm from '@/components/TaskFormrevised'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const Createtask = () => {
  return (
    <div className='flex flex-row gap-5'>
      <Sidebar width='w-1/6'/>
      <TaskForm/>
    </div>
  )
}

export default Createtask