import React from 'react'

const footer = () => {
  return (
    <div className='absolute w-full fixed bottom-0 left-0  '>
    <div className='flex flex-col bg-slate-800 text-white justify-between items-center '>
             <div className="logo font-bold ">
        <span className='text-green-500'> &lt;</span>
          
            <span className='text-white'>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
          
             </div>
    <div className="flex justify-center items-center">
      Created with <img src="red-heart.svg" alt="love" width={15} /> by Siddharth Mishra
    </div>
    </div>
    </div>
  )
}

export default footer
