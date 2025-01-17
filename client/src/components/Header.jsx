import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {user,setshowLogin} = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () =>{
   if(user){
    navigate('/result')
   } else {
    setshowLogin(true)
   }
  }
  return (
    <motion.div initial={{opacity:0.2,y:100}} transition={{duration:1}} viewport={{once: true}} whileInView={{opacity:1,y:0}} className='flex flex-col justify-center items-center my-20 text-center'>
        <motion.div initial={{opacity:0,y:-20}} viewport={{once: true}} transition={{duration:1,delay:1}} animate={{opacity:1,y:0}} className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
            <p>Best text to Image generator</p>
            <img src={assets.star_icon} alt="" />
        </motion.div>
        <motion.h1 initial={{opacity:0.2}} transition={{duration:2,delay:0.4}} viewport={{once: true}} animate={{opacity:1}} className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'>image</span> in seconds.</motion.h1>
       <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual arts in seconds - just type and watch the magic happen.</p>
       <motion.button onClick={onClickHandler} whileHover={{scale:1.05}} whileTap={{scale:0.95}} initial={{opacity:0}} animate={{opacity:1}} transition={{default:{duration:0.5}, opacity:{delay:0.8,duration:1}}} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 rounded-full flex items-center gap-2 '>
        Generate images
        <img className='h-6' src={assets.star_group} alt="" />
       </motion.button>
       <div className='flex flex-wrap justify-center mt-16 gap-3 '>
        {Array(6).fill('').map((items,index) => {
            return (
                <img className='rounded hover:scale-105 duration-700 transition-all cursor-pointer max-sm:w-10 ' src={index % 2 == 0 ? assets.sample_img_2 : assets.sample_img_1} alt="" key={index} width={70}/>
            )
        })}
       </div>
       <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
    </motion.div>
  )
}

export default Header