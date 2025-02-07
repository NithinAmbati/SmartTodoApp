import React, { useState } from 'react';
import { deleteTask, editTask } from '../Store/ApiCalls';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import MUISelect from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

const TasksView = ({ tasks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [subtasks, setSubtasks] = useState(['']);
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('1');
  const [dependencies, setDependencies] = useState([]);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskName(task.taskName);
    setTaskDesc(task.taskDesc);
    setSubtasks(task.subtasks);
    setDeadline(task.deadline);
    setPriority(task.priority);
    setDependencies(task.dependencies);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskName') setTaskName(value);
    if (name === 'taskDesc') setTaskDesc(value);
    if (name === 'deadline') setDeadline(value);
    if (name === 'priority') setPriority(value);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = subtasks.map((subtask, i) => i === index ? value : subtask);
    setSubtasks(updatedSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleDependencyChange = (event, value) => {
    setDependencies(value);
  };



  const updateTask=async(task)=> {
    await editTask(task);
  }

  const deleteTaskById=async(id)=>{
    console.log(id)
    await deleteTask(id);
  }


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <select>
        <option>Priority 1 tasks</option>
        <option>Priority 2 tasks</option>
        <option>Priority 3 tasks</option>
      </select>
      <h1 className="text-xl font-bold mb-4">All Tasks</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="border p-3 rounded bg-gray-100">
            <h2 className="font-semibold">{task.taskName}</h2>
            <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
            {task.subtasks.length > 0 && (
              <ul className="mt-2 pl-4 list-disc text-sm text-gray-700">
                {task.subtasks.map((subtask, index) => (
                  <li key={index}>{subtask}</li>
                ))}
              </ul>
            )}
            {task.dependencies.length > 0 && (
              <p className="text-sm text-blue-600">Depends on: {task.dependencies.join(', ')}</p>
            )}
            <div className="mt-2 space-x-2">
              <button onClick={() => openEditModal(task)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => openDeleteModal(task)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold">Edit Task</h2>
            <input type="text" name="taskName" value={taskName} onChange={handleEditChange} className="w-full border p-2 rounded my-2" placeholder="Task Name" />
            <input type="text" name="taskDesc" value={taskDesc} onChange={handleEditChange} className="w-full border p-2 rounded my-2" placeholder="Task Description" />
            <input type="date" name="deadline" value={deadline} onChange={handleEditChange} className="w-full border p-2 rounded my-2" />
            <select name="priority" value={priority} onChange={handleEditChange} className="w-full border p-2 rounded my-2">
              <option value="1">HIGH</option>
              <option value="2">MEDIUM</option>
              <option value="3">LOW</option>
            </select>
            <div className="my-2">
              <h2 className="font-medium">Subtasks</h2>
              {subtasks.map((subtask, index) => (
                <input key={index} type="text" className="w-full border p-2 rounded my-1" placeholder={`Subtask ${index + 1}`} value={subtask} onChange={(e) => handleSubtaskChange(index, e.target.value)} />
              ))}
              <button className="mt-2 bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600" onClick={addSubtask}>+ Add Subtask</button>
            </div>
            <div className="my-2">
              <h2 className="font-medium">Dependencies</h2>
              <Autocomplete
                            multiple
                            options={tasks?.filter(task => task && task.taskName) || []}
                            getOptionLabel={(task) => task?.taskName || ""}
                            value={dependencies}
                            onChange={handleDependencyChange}
                            renderInput={(params) => <TextField {...params} label="Select Dependencies" fullWidth />}
                          />            
                  </div>
            <div className="flex justify-end space-x-2 mt-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={() => { updateTask({id: selectedTask._id, taskName, taskDesc, subtasks, deadline, priority, dependencies }); setIsEditModalOpen(false); }} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold">Delete Task</h2>
            <p>Are you sure you want to delete "{selectedTask.taskName}"?</p>
            <div className="flex justify-end space-x-2 mt-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={() => { deleteTaskById(selectedTask._id); setIsDeleteModalOpen(false); }} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksView;
