import React from 'react'

const Loading = () => {
  return (
   <div className='flex items-center justify-center  h-screen bg-gray-100'>
    <div className='w-24 h-24 border-8 border-blue-500  border-t-transparent rounded-full animate-spin '></div>
   </div>
  )
}

export default Loading;