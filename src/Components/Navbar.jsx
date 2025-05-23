import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 w-full'>
        <div className="mycontainer  flex justify-around items-center px-4 h-15 py-5 ">
        <div className="logo font-bold ">
        <span className='text-green-500'> &lt;</span>
          
            <span className='text-white'>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
          
             </div>
    {/* <ul>
        <li className='flex gap-4 text-white'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li> 
     </ul>*/}
     <button>
        <img src="github.svg" alt="github" width={30} />
        </button>
     
     </div>
    </nav>
  )
}

export default Navbar
