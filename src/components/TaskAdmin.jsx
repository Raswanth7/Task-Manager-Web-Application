import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { IconButton, Chip, TextField, Box, Dialog, DialogTitle, DialogContent, Collapse, Typography, Autocomplete} from '@mui/material';
import { EditOutlined } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LicenseInfo } from '@mui/x-license';



// Set the MUI X license key
LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

const TaskAdmin = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchCriteria, setSearchCriteria] = useState(''); // default search 
  const [expandedRow, setExpandedRow] = useState(null);

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // const fetchTasks =  () => {
  //   try {
  //      axios.get('http://13.200.67.212:8092/scriptcase/app/speedpsaas_clone/Task_Admin/').
  //      then((res)=>{
  //     setTasks(res.data);
  //      })
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  // const handleDelete =  (taskId) => {
  //   try {
  //      axios.post('http://13.200.67.212:8092/scriptcase/app/speedpsaas_clone/Task_Admin_delete/', { task_number: taskId })
  //      .then((res)=>{
  //     toast.success('Data deleted successfully!');
  //     fetchTasks(res.data);})
  //   } catch (error) {
  //     console.error('Error deleting task:', error);
  //     toast.error('Failed to delete task.');
  //   }
  // };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleSearchChange = (event, value) => {
    setSearchText(value);
  };

  const handleCriteriaChange = (event, value) => {
    if (value) {
      setSearchCriteria(value);
      setSearchText(''); // Clear search text when changing criteria
    }
  };

  const filteredRows = tasks.filter((row) =>
    String(row[searchCriteria]).toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleExpandRow = (taskId) => {
    setExpandedRow(prev => (prev === taskId ? null : taskId));
  };

  const getStatusChip = (status) => {
    const statusMap = {
      Completed: { color: 'green', icon: 'Completed✔' },
      Working: { color: 'brown', icon: 'Working⟳' },
      Assigned: { color: 'orange', icon: 'Assigned🔔' },
      Testing: { color: 'red', icon: 'Testing🧪' },
      Hold: { color: 'blue', icon: 'Hold⏸️' },
      'Customer Acceptance': { color: 'purple', icon: 'Customer Acceptance✔️' },
    };

    const { color, icon } = statusMap[status] || { color: 'gray', icon: '❓' };

    return (
      <Chip
        label={icon}
        sx={{
          borderRadius: '16px',
          borderColor: color,
          color: color,
          backgroundColor: 'white',
          border: `1px solid ${color}`,
          '& .MuiChip-label': {
            color: color,
          },
        }}
      />
    );
  };

  const getPriorityChip = (priority) => {
    const priorityMap = {
      '1': { color: 'red', label: 'High' },
      '2': { color: 'orange', label: 'Medium' },
      '3': { color: 'green', label: 'Low' },
      '0': { color: 'gray', label: 'None' },
    };

    const { color, label } = priorityMap[priority] || { color: 'gray', label: 'Unknown' };

    return (
      <Chip
        label={label}
        sx={{
          borderRadius: '16px',
          borderColor: color,
          color: color,
          backgroundColor: 'white',
          border: `1px solid ${color}`,
          '& .MuiChip-label': {
            color: color,
          },
        }}
      />
    );
  };

  const getSubTaskChip = (subtasks) => {
    const subtaskMap = {
      '1': { color: 'red', label: 'Not started' },
      '2': { color: 'orange', label: 'In process' },
      '3': { color: 'green', label: 'Completed' },
      '0': { color: 'gray', label: 'None' },
    };

    return subtasks.map((subTask, index) => {
      const { color, label } = subtaskMap[subTask.status] || { color: 'gray', label: 'Unknown' };

      return (
        <Box key={index} sx={{ marginBottom: '4px' }}>
          <Chip
            label={label}
            sx={{
              borderRadius: '16px',
              borderColor: color,
              color: color,
              backgroundColor: 'white',
              border: `1px solid ${color}`,
              '& .MuiChip-label': {
                color: color,
              },
            }}
          />
          {subTask.description}
        </Box>
      );
    });
  };

  const parseBugDetails = (bugDetails) => {
    if (typeof bugDetails === 'string') {
      try {
        return JSON.parse(bugDetails);
      } catch (e) {
        console.error('Error parsing BUG_DETAILS:', e);
        return [];
      }
    } else if (Array.isArray(bugDetails)) {
      return bugDetails;
    } else {
      console.error('Unexpected BUG_DETAILS format:', bugDetails);
      return [];
    }
  };

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditClick(params.row)} color="primary">
            <EditOutlined className='text-lg ' />
          </IconButton>
          <IconButton 
          // onClick={() => handleDelete(params.row.TASK_NUMBER)} 
          color="secondary">
            <DeleteFilled className='text-lg text-red-500' />
          </IconButton>
        </div>
      ),
    },
    { field: 'TASK_NUMBER', headerName: 'Task Number', width: 150 },
    { field: 'CREATED_DATE', headerName: 'Created Date', width: 150 },
    { field: 'PROJECT', headerName: 'Project', width: 200 },
    { field: 'CLINT', headerName: 'Client', width: 150 },
    {
      field: 'BUG_DETAILS',
      headerName: 'Bug Details',
      width: 300,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => toggleExpandRow(params.row.TASK_NUMBER)}>
            {expandedRow === params.row.TASK_NUMBER ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Collapse in={expandedRow === params.row.TASK_NUMBER}>
            <Typography variant="subtitle2">Bug Details:</Typography>
            {parseBugDetails(params.row.BUG_DETAILS).map((bug, index) => (
              <Box key={index} sx={{ marginBottom: '16px' }}>
                <Typography variant="body1"><strong>{bug.title}</strong></Typography>
                <Typography variant="body2">Sub-tasks:</Typography>
                {bug.subtasks ? getSubTaskChip(bug.subtasks) : 'No subtasks available'}
              </Box>
            ))}
          </Collapse>
        </Box>
      ),
    },
    { field: 'PRIORITY_TYPE', headerName: 'Priority', width: 150, renderCell: (params) => getPriorityChip(params.value) },
    { field: 'STATUS', headerName: 'Status', width: 150, renderCell: (params) => getStatusChip(params.value) },
    { field: 'CREATED_BY', headerName: 'Created By', width: 150 },
    { field: 'ASSIGNED', headerName: 'Assigned To', width: 150, editable: true },
    { field: 'COMPLETED_DATE', headerName: 'Completed Date', width: 150, editable: true },
    { field: 'START_TIME', headerName: 'Start Time', width: 150, editable: true },
    { field: 'END_TIME', headerName: 'End Time', width: 150, editable: true },
    { field: 'REMARKS', headerName: 'Remarks', width: 150, editable: true },
    { field: 'PENDING_DAYS', headerName: 'Pending Days', width: 150, editable: true },
  ];

  return (
     <Box className='pt-12' >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Box className='flex items-center mb-5 ' >
        <Autocomplete
          options={
            ['TASK_NUMBER', 'PROJECT', 'STATUS','CREATED_BY','ASSIGNED']
          } // Add more options if needed
          value={searchCriteria}
          onChange={handleCriteriaChange}
          renderInput={(params) => <TextField {...params} label="Filter By" variant="outlined" />}
          className='w-52 mr-5'
        />
        <TextField
          className='hover:border-black'
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => handleSearchChange(e, e.target.value)}
          InputProps={{
            sx: {
              padding: '5px',
              height: '40px',
              borderRadius: '50px',
            },
          }}
        />
      </Box>
      <Box className='' sx={{ height: 550, width: 1200 }}>
        <DataGridPremium 
          className='scroll-smooth'
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.TASK_NUMBER}
          sx={{
            '& .MuiDataGridPremium-columnHeaders': {
              backgroundColor: 'blue',
            },
            '& .MuiDataGridPremium-columnHeader': {
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'white',
              backgroundColor: 'darkblue',
            },
          }}
        />
      </Box>
      {open && currentTask && (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            
            <TaskForm
              taskToEdit={currentTask}
              onDataSaved={(updatedTask) => {
                setTasks(prevTasks => prevTasks.map(task => task.TASK_NUMBER === updatedTask.TASK_NUMBER ? updatedTask : task));
                setOpen(false);
                toast.success('Task updated successfully!');
              }}
            /> 
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default TaskAdmin;
