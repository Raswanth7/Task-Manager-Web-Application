import React from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { PlusOutlined } from '@ant-design/icons';
import ClientAddress from './ClientAddress';

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Actions', width: 150 },
  { field: 'col2', headerName: 'Client ID', width: 150 },
  { field: 'col3', headerName: 'Client Name', width: 150 },
  { field: 'col4', headerName: 'Address 1', width: 150 },
  { field: 'col5', headerName: 'Address 2', width: 150 },
];

const ClientDetails = () => {
  return (
   <section className='flex gap-9 md:gap-17 '>
   <Sidebar width='w-1/6'/>
   <main className='flex flex-col justify-start '>
    <ClientAddress/>
   </main>
   </section>
  )
}

export default ClientDetails