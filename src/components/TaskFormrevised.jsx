import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
// import './TaskForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
      } from "@/components/ui/card"
import { Button } from './ui/button'; 
import { Dialog,DialogContent, DialogTrigger } from './ui/dialog';
import { Label } from "@/components/ui/label"

const Day = new Date()
const Month = new Date().getMonth() < 10 ? `0`+new Date().getMonth():new Date().getMonth();
const currentDate = `${Day.getDate()}/${Month}/${Day.getFullYear()}`


 const TaskForm = ({ onClose, onDataSaved }) => {
  const [formData, setFormData] = useState({
    TASK_NUMBER: '',
    CREATED_DATE: '',
    PROJECT: '',
    CLINT: '',
  });

  const [bugDetails, setBugDetails] = useState({ title: '' });
  const [subtasks, setSubtasks] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      // Reset form data when modal opens
      setFormData({
        TASK_NUMBER: '',
        CREATED_DATE: new Date().toISOString().split('T')[0],
        PROJECT: '',
        CLINT: '',
      });
      setBugDetails({ title: '' });
      setSubtasks([]);
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBugDetailChange = (e) => {
    const { name, value } = e.target;
    setBugDetails({
      ...bugDetails,
      [name]: value
    });
  };

  const handleSubTaskChange = (index, e) => {
    const { value } = e.target;
    const updatedSubTasks = [...subtasks];
    updatedSubTasks[index] = value;
    setSubtasks(updatedSubTasks);
  };

  const addSubTask = () => {
    const updatedSubTasks = [...subtasks, ''];
    setSubtasks(updatedSubTasks);
  };

  const removeSubTask = (index) => {
    const updatedSubTasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const taskResponse = await axios.post('http://13.200.67.212:8092/scriptcase/app/speedpsaas_clone/Task_Admin_insert/', {
        ...formData,
        BUG_DETAILS: bugDetails.title,
        SUBTASK: subtasks
      });
  
      if (taskResponse.status === 200) {
        console.log(taskResponse.data);
        toast.success('Data saved successfully!');
        if (onDataSaved) onDataSaved();
        setIsModalOpen(false);
      } else {
        toast.error('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data. Please try again.');
    }
  };



  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="flex justify-center mt-5">
        <Card className='flex flex-col items-center'>
          <CardHeader>
            <CardTitle>
                Task Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
                <DialogTrigger><Button onClick={() => setIsModalOpen(true)} >Add Task </Button></DialogTrigger>
            <DialogContent  className='min-h-screen min-w-full flex justify-center items-center'>
            <div className="modal-overlay">
          <div className="w-56">
            <div className='flex justify-center pb-5 items-center'>
            <h2 className='text-xl font-semibold'>Add Task</h2>
            </div>
            <form onSubmit={handleSubmit} className="task-form">              <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
             <Label htmlFor="date" className="text-left">
              Created Date
             </Label>
            <span className='w-full border p-2 rounded-md'>
             {currentDate}
            </span>
             </div>
                {/* <label htmlFor="CREATED_DATE">Created Date</label>
                <input
                  type="text"
                  id="CREATED_DATE"
                  name="CREATED_DATE"
                  value={formData.CREATED_DATE}
                  readOnly
                /> */}
              </div>

              <div className="grid grid-cols-1 items-center gap-3 pb-3">
                <label htmlFor="title">Bug Details</label>
                <textarea
                  id="title"
                  name="title"
                  value={bugDetails.title}
                  onChange={handleBugDetailChange}
                  required
                />
              </div>
             
              {subtasks.map((subtask, index) => (
                <div className="pb-2" key={index}>
                  <input
                    className='p-2'
                    type="text"
                    name="description"
                    value={subtask}
                    onChange={(e) => handleSubTaskChange(index, e)}
                    placeholder={`Subtask ${index + 1}`}
                    required
                  />
                  <button type="button" className="pl-2" onClick={() => removeSubTask(index)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}

              <button type="button" className="add-subtask" onClick={addSubTask}>
                <FontAwesomeIcon icon={faPlus} /> Add Subtask
              </button>

              <div className="pt-4 flex gap-6">
                {/* <button type="submit" className="save-button">Save</button>  */}
                <DialogTrigger>
                <Button className='bg-blue-400 hover:bg-blue-500 rounded-md w-18'>Save</Button> 
                </DialogTrigger>
                
                {/* <button type="button" className="cancel-button" onClick={() => { setIsModalOpen(false); if (onClose) onClose(); }}>Cancel</button> */}
              </div>
            </form>
          </div>
        </div>
            </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        </div>
        {/* <div className="add-task-title">Task Manager</div>
        <button onClick={() => setIsModalOpen(true)} className="add-task-button">
          Add Task
        </button>
      </div> */}

      {/* {isModalOpen && (

        
      )} */}
    </div>
  );
};


TaskForm.propTypes = {
  onClose: PropTypes.func,
  onDataSaved: PropTypes.func,
};

export default TaskForm

