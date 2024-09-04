import React from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from './ui/button';
import { PlusOutlined } from '@ant-design/icons';

const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: '', width: 150 },
    { field: 'col2', headerName: 'Task No', width: 150 },
    { field: 'col3', headerName: 'Created Date', width: 150 },
    { field: 'col4', headerName: 'Project', width: 150 },
    { field: 'col5', headerName: 'Client', width: 150 },
    { field: 'col6', headerName: 'Bug Details', width: 150 },
    { field: 'col7', headerName: 'Created By', width: 150 },
    { field: 'col8', headerName: 'Status', width: 150 },
    { field: 'col9', headerName: 'Assigned to', width: 150 },
    { field: 'col10', headerName: 'Start Time', width: 150 },
    { field: 'col11', headerName: 'End Time', width: 150 },
    { field: 'col12', headerName: 'Completed Date', width: 150 },
    { field: 'col13', headerName: 'Priority', width: 150 },
    { field: 'col14', headerName: 'Remarks', width: 150 },
    { field: 'col15', headerName: 'Pending Days', width: 150 },
  ];
const Userstatuscomponent = () => {
  return (
    <section className='flex flex-row gap-9 md:gap-17'>
   <Sidebar width='w-1/6'/>
   <main className='flex flex-col justify-start'>
   <div className='flex flex-row gap-4 pt-20'>
    <input type='text' className='border border-black w-42 rounded-md p-2'></input>
    <Button className='flex gap-2 bg-transparent hover:bg-gradient-to-r from-emerald-300 to-emerald-500 text-black'><PlusOutlined/>Add New</Button>
   </div>
   <div className='pt-5 flex ' style={{height: 500, width: 1200 }}>
      <DataGrid className=' shadow-xl shadow-neutral-300' rows={rows} columns={columns} />
    </div>
   </main>
   </section>
  )
}

export default Userstatuscomponent