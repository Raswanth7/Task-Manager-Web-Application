import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from './ui/button';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';

export const ClientAddress = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [loader,setLoader] = useState(true);
  

  // useEffect(() => {
  //   fetchData();
    
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http:testapi');
  //     if (response.data && Array.isArray(response.data)) {
  //       setRows(response.data.map((row) => ({ ...row, id: row.CLIENT_ID }))); 
  //       setLoader((prevState)=>!prevState);
  //     } else {
  //       toast.error('No data found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     toast.error('Error fetching data');
  //   }
  // };

  

  const handleAdd = () => {
    const maxClientId = rows.length ? Math.max(...rows.map(row => row.CLIENT_ID)) : 0;
    
    setEditRowData({
      CLIENT_ID: maxClientId + 1,
      CLIENT_NAME: '',
      
      ADDRESS_1: '',
      ADDRESS_2: '',
      CLIENT_PHONE:'',
      isNew: true,
    });
    setOpenDialog(true);
    setIsAdding(true);
  };

  const handleEdit = (row) => {
    setEditRowData({ ...row, isNew: false });
    
    setOpenDialog(true);
    setIsAdding(false);
  };

  // const handleSave = async () => {
  //   try {
  //     if (editRowData.isNew) {
  //       await axios.post('http://testapi/insert', editRowData);
  //       toast.success('Record added successfully');
  //     } else {
  //       await axios.post('http://testapi/update', editRowData);
  //       toast.success('Record updated successfully');
  //     }
  //     fetchData();
  //     setOpenDialog(false);
  //     setEditRowData({});
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //     toast.error('Error saving data');
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.post('http://testapi/DELETE/', { CLIENT_ID: id });
  //     toast.success('Record deleted successfully');
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error deleting record:', error);
  //     toast.error('Error deleting record');
  //   }
  // };

  const handleChange = (e) => {
    const { name, value} = e.target;
    setEditRowData((prev) => ({
      ...prev,
      [name]:  value
    }));
    
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
            <IconButton
             onClick={() => handleEdit(params.row)} 
             color="primary">
            <EditOutlined className='text-lg'/>
          </IconButton>
          <IconButton
          //  onClick={() => handleDelete(params.row.CLIENT_ID)} 
           color="secondary">
            <DeleteFilled className='text-lg text-red-500'/>
          </IconButton>
        </div>
      ),
    },
    { field: 'CLIENT_ID', headerName: 'Client ID', width: 150 },
    { field: 'CLIENT_NAME', headerName: 'Client Name', width: 200 },
    { field: 'ADDRESS_1', headerName: 'Address 1', width: 250 },
    { field: 'ADDRESS_2', headerName: 'Address 2', width: 300 },
    { field: 'CLIENT_PHONE', headerName: 'Client Number', width: 300 },
  ];

  return (
    <Box className='p-4 pt-9'>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Box className='mb-2 flex gap-2 items-center'>
      <TextField 
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            sx: {
              marginTop:'20px',
              marginLeft:'10px',
              marginBottom:'20px',
              padding:'5px',
              height:'40px',
              borderRadius: '50px',
              
            },
          }}
        />
        <Button onClick={handleAdd} className='p-2 flex gap-2 bg-transparent hover:bg-gradient-to-r from-emerald-300 to-emerald-500 text-black'>
        <PlusOutlined/>Add New
        </Button>
      </Box>
      <Box sx={{ height: 500, width: 1200 }}> 
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.CLIENT_ID}
          disableSelectionOnClick 
          
        />
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isAdding ? 'Add New Record' : 'Edit Record'}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              name="CLIENT_ID"
              label="Client ID"
              value={editRowData.CLIENT_ID || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isAdding}
            />
            <TextField
              name="CLIENT_NAME"
              label="Client Name"
              value={editRowData.CLIENT_NAME || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            
            <TextField
              name="ADDRESS_1"
              label="Address 1"
              value={editRowData.ADDRESS_1 || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="ADDRESS_2"
              label="Address 2"
              value={editRowData.ADDRESS_2 || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="CLIENT_PHONE"
              label="Client Number"
              value={editRowData.CLIENT_PHONE || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="outlined" onClick={() => setOpenDialog(false)} sx={{ marginRight: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" 
              // onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClientAddress;
