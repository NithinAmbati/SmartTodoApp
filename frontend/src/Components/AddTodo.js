import React, { useState } from 'react';
import { addNewTask } from '../Store/ApiCalls';

const AddTodo = ({ tasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [subtasks, setSubtasks] = useState(['']);
  const [deadline, setDeadline] = useState('');

  const [dependencies, setDependencies] = useState([]);

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = subtasks.map((subtask, i) => i === index ? value : subtask);
    setSubtasks(updatedSubtasks);
  };

  const handleDependencyChange = (taskId) => {
    setDependencies(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSubmit = async() => {
    const newTask = { taskName, subtasks, deadline, dependencies };
    console.log('Task Created:', newTask);
    await addNewTask(newTask);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Add Todo Here</h1>
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
        {tasks && tasks.length > 0 ? (
          <div>
            {tasks.map(task => (
              <label key={task.id} className="block">
                <input 
                  type="checkbox" 
                  checked={dependencies.includes(task.id)} 
                  onChange={() => handleDependencyChange(task.id)}
                />
                {task.taskName}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No existing tasks available</p>
        )}
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
