import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion'
const Navbar = () => {
    const {user,setshowLogin,logout,credit} = useContext(AppContext);
    // console.log(credit)
    const navigate = useNavigate();
  return (
    <motion.div initial={{y:-20,opacity:0}} transition={{duration:1}} animate={{y:0,opacity:1}}  className='flex items-center py-4 justify-between'>
       <Link to="/">
        <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
       </Link>
       <div>
       {user ?
        <div className='flex items-center gap-2 sm:gap-3'>
           <button onClick={()=>{navigate("/buy")}} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
            <img src={assets.credit_star} alt="" className='w-5' />
            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p>
           </button>
           <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
           <div className='relative group'>
            <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 text-sm border bg-white rounded-md '>
                    <li onClick={logout} className='px-2 py-1 cursor-pointer pr-10'>Logout</li>
                </ul>
            </div>
           </div>
        </div>:
         <div className='flex items-center gap-2 sm:gap-5'>
           <Link to={"/buy"}><p className='cursor-pointer'>Pricing</p></Link>
           <button className='bg-zinc-800 px-7 text-white py-2 sm:px-8 text-sm rounded-full' onClick={()=>setshowLogin(true)}>Login</button>
       </div> }
       </div>
    </motion.div>
  )
}

export default Navbar