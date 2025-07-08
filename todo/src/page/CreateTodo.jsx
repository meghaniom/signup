import React, { useState } from 'react'
import api from '../utils/api';

const CreateTodo = () => {
    const [taskname, setTaskname] = useState('');
    const addTodo =async(e) => {
        e.preventDefault();
        try {
            await api.post('/todo',{taskname});
            setTaskname('');
        }catch(err) {
           alert('Task exists or failed.');
        }
    };
  return (
   <form onSubmit={addTodo}>
    <input type="text"
    value={taskname}
    onChange={(e) => setTaskname(e.target.value)}
    placeholder='Enter your task'
    className='flex-1 p-2 border rounded'
    required />
      <button type="submit" className="bg-green-500 text-white px-4 rounded hover:bg-green-600">Add</button>
   </form>
  )
}

export default CreateTodo