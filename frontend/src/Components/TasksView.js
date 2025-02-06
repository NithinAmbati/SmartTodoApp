import React from 'react';

const TasksView = ({ tasks }) => {
  console.log(tasks)
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">All Tasks</h1>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="border p-3 rounded bg-gray-100">
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
            </li>
          ))}
        </ul>
    </div>
  );
};

export default TasksView;
