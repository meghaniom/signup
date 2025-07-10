import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import AddTodoAdmin from './addTodoAdmin'
import AdminTodoList from './adminTodoList'



const Admindashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh((prev)=> !prev);
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar/>
      <div className='max-w-xl mx-auto mt-6 p-4'> 
      <AddTodoAdmin onAdd = {triggerRefresh}/>
      <AdminTodoList key={refresh}/>
      </div>
    </div>
  )
}
export default Admindashboard