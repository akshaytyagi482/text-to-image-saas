import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = (props) => {
     const [user,Setuser] = useState(false);
     const [showLogin, setshowLogin] = useState(false)
     const [token,setToken] = useState(localStorage.getItem('token'))
    const backendurl = import.meta.env.backend_url || "http://localhost:4000";
    const navigate = useNavigate();
   //  console.log(import.meta.env.backend_url)
    const [credit,setcredit] = useState(false)

    const loadcredit = async () =>{
      try {
         const {data} = await axios.post(backendurl + '/api/user/credits',{},{ headers: { token } })
         console.log(data)
         if(data.success){
            setcredit(data.credits)
            Setuser(data.user)
         }
      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
    }
    const generateImage = async (prompt) =>{
         try {
           const {data} = await axios.post(backendurl + '/api/image/generate',{prompt},{headers:{token}})
           if(data.success){
            loadcredit()
            return data.resultImage
           } else {
            toast.error(data.message)
            loadcredit()
            if(data.creditBalance == 0){
               navigate('/buy')
            }
           }
         } catch (error) {
            console.log(error)
            toast.error(error.message)
         }
    }
     const logout = () =>{
      localStorage.removeItem('token')
      setToken('')
      Setuser(null)
     }
    useEffect(()=>{
      if(token){
         loadcredit()
      }
    },[token])

     const value = {
        user,Setuser,showLogin,setshowLogin,backendurl,token,setToken,credit,setcredit,loadcredit,logout,generateImage
     }
     return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
     )
}

export default AppContextProvider;