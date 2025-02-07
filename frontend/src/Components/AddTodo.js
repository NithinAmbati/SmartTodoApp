import React, { useState } from 'react';
import { addNewTask } from '../Store/ApiCalls';
import Select from 'react-select';

const AddTodo = ({ tasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [subtasks, setSubtasks] = useState(['']);
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('1');
  const [dependencies, setDependencies] = useState([]);

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = subtasks.map((subtask, i) => i === index ? value : subtask);
    setSubtasks(updatedSubtasks);
  };

  const handleSubmit = async () => {
    const newTask = { taskName, taskDesc, subtasks, deadline, priority, dependencies };
    console.log('Task Created:', newTask);
    await addNewTask(newTask);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Schedule your Task Here</h1>
      <input 
        type="text" 
        className="w-full border p-2 rounded mb-3" 
        placeholder="Enter Task" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input 
        type="text" 
        className="w-full border p-2 rounded mb-3" 
        placeholder="Enter Task description" 
        value={taskDesc} 
        onChange={(e) => setTaskDesc(e.target.value)}
      />
      <input 
        type="date" 
        className="w-full border p-2 rounded mb-3"
        value={deadline} 
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select 
        className="w-full border p-2 rounded mb-3" 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="1">HIGH</option>
        <option value="2">MEDIUM</option>
        <option value="3">LOW</option>
      </select>
      <div className="mb-3">
        <h2 className="font-medium">Subtasks</h2>
        {subtasks.map((subtask, index) => (
          <input
            key={index}
            type="text"
            className="w-full border p-2 rounded my-1"
            placeholder={`Subtask ${index + 1}`}
            value={subtask}
            onChange={(e) => handleSubtaskChange(index, e.target.value)}
          />
        ))}
        <button 
          className="mt-2 bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600" 
          onClick={addSubtask}
        >
          + Add Subtask
        </button>
      </div>
      <div className="mb-3">
        <h2 className="font-medium">Dependencies</h2>
        <Select 
          isMulti 
          options={tasks.map(task => ({ value: task.id, label: task.taskName }))} 
          className="w-full border rounded mb-3" 
          placeholder="Select dependencies..." 
          menuPortalTarget={document.body} 
          onChange={(selectedOptions) => setDependencies(selectedOptions.map(option => option.value))}
        />
      </div>
      <button 
        className="w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600" 
        onClick={handleSubmit}
      >
        Create Task
      </button>
    </div>
  );
};

export default AddTodo;
