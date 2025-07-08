import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ReadTodo = () => {
  const [todo, setTodo] = useState([]);

  const getTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodo(res.data.todo)
    } catch (error) {
      console.log(error);
      console.error("Error fetching todos:", err);
    }
  };
   const deleteTodo = async () =>  {
    try {
        await api.delete(`/todo/${id}`);
        getTodos();
    }
    catch (error) {
        console.log('Delete Failed')
    }
   };

   useEffect(()=> {
    getTodos();
   },[]);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Todos</h2>
      <ul>
         {todo.map((todos) => (
          <li key={todos._id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
            {todos.taskname}
            <button onClick={() => deleteTodo(todos._id)} className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadTodo;
