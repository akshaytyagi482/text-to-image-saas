import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image,setimage] = useState(assets.sample_img_1);
  const [IsImageLoaded,setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input,setinput] = useState('');
  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) =>{
       e.preventDefault()
       setLoading(true)
       if(input){
        const image = await generateImage(input)
        if(image){
          setIsImageLoaded(true)
          setimage(image)
        }
       }
       setLoading(false)
  }
  return (
    <motion.form initial={{y:100,opacity:0.2}} viewport={{once:true}} transition={{duration:1}} animate={{y:0,opacity:1}} onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>
         <img src={image} className='max-w-sm rounded' alt="" />
         <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}/>
      </div>
       <p className={!loading ? 'hidden' : ''}>Loading....</p>
    </div>
    {!IsImageLoaded &&
  <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
  <input onChange={(e)=>{setinput(e.target.value)}} value={input} type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
  <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
     Generate
  </button>
</div>
}
    {IsImageLoaded &&
      <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
        <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 rounded-full text-black px-10 py-3 cursor-pointer '>Generate Another</p>
        <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
      </div>
      }

    </motion.form>
  )
}

export default Result