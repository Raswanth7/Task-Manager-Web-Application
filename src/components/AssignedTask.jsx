import React from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button'
import { SearchOutlined } from '@ant-design/icons';
import TaskAdmin from './TaskAdmin';

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Actions', width: 150 },
  { field: 'col2', headerName: 'TaskNumber', width: 150 },
  { field: 'col3', headerName: 'Created Date', width: 150 },
  { field: 'col4', headerName: 'Project', width: 150 },
  { field: 'col5', headerName: 'Client', width: 150 },
  { field: 'col6', headerName: 'Priority', width: 150 },
  { field: 'col7', headerName: 'Status', width: 150 },
  { field: 'col8', headerName: 'Bug Details', width: 150 },
  { field: 'col9', headerName: 'Created By', width: 150 },
  { field: 'col10', headerName: 'Assigned to', width: 150 },
  { field: 'col11', headerName: 'Completed Date', width: 150 },
  { field: 'col12', headerName: 'Start Time', width: 150 },
  { field: 'col13', headerName: 'End Time', width: 150 },
  { field: 'col14', headerName: 'Remarks', width: 150 },
  { field: 'col15', headerName: 'Pending Days', width: 150 },
];

const AssignedTasks = () => {
  return (
   <section className='flex gap-9 md:gap-17'>
   <Sidebar width='w-1/6'/>
   <main className='flex flex-col'>
   {/* <div className='flex flex-row gap-4 pt-20'>
    <input type='text' className='border border-black w-42 rounded-md p-2'></input>
    <Button className='flex gap-2 bg-transparent hover:bg-green-400 text-black'><SearchOutlined className='text-lg'/></Button>
   </div> */}
   {/* <div className='flex pt-5'style={{height: 500, width:1200 }}>
      <DataGrid className=' shadow-xl  shadow-neutral-300' rows={rows} columns={columns} />
    </div> */}
    <TaskAdmin/>
   </main>
   </section>
  )
}

export default AssignedTasks