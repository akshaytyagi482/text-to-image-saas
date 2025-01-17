import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import {motion} from 'framer-motion'
const Login = () => {
    const [state, setstate] = useState('Login');
    const {setshowLogin,backendurl,setToken,Setuser} = useContext(AppContext);
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    
     const onsubmithandler = async (e) =>{
        e.preventDefault();
        try {
            if(state === 'Login'){
               const {data} = await axios.post(backendurl + '/api/user/login',{email,password})
               if(data.success){
                setToken(data.token)
                Setuser(data.user)
                localStorage.setItem('token',data.token)
                setshowLogin(false)
               } else {
                    toast.error(data.message)
               }
            } else {
                const {data} = await axios.post(backendurl + '/api/user/register',{name,email,password})
                if(data.success){
                 setToken(data.token)
                 Setuser(data.user)
                 localStorage.setItem('token',data.token)
                 setshowLogin(false)
                } else {
                     toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
     }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return () =>{
            document.body.style.overflow = 'unset';
        }
    },[])
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form onSubmit={onsubmithandler} initial={{y:50,opacity:0.2}} viewport={{once:true}} transition={{duration:0.3}} animate={{y:0,opacity:1}} className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            {state != 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.profile_icon} width={21} alt="" />
                <input onChange={(e)=>{setname(e.target.value)}} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required />
            </div>}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon}  alt="" />
                <input onChange={(e)=>{setemail(e.target.value)}} value={email} type="email" className='outline-none text-sm' placeholder='Email Address' required />
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={(e)=>{setpassword(e.target.value)}} value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
            <button className='bg-blue-600 text-white py-2 w-full rounded-full'>{state == 'Login' ? 'login':'create account'}</button>
            {state == 'Login' ? <p className='mt-5 text-center text-sm'>Don't have an account? <span className='cursor-pointer text-blue-600' onClick={()=>setstate('Signup')}>Sign Up</span></p>
           : <p className='mt-5 text-center text-sm'>Already have an account? <span className='cursor-pointer text-blue-600' onClick={()=>setstate('Login')}>Login</span></p>}
            <img src={assets.cross_icon} onClick={()=>{setshowLogin(false)}} className='absolute right-5 top-5 cursor-pointer' width={15} alt="" />
        </motion.form>
    </div>
  )
}

export default Login