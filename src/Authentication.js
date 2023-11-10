import axios from './api/axiosPrivate'
import React, { useContext,  useState } from 'react'
export const userStatus=React.createContext();
export default function Authentication(props) {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')) || false);

    const login=async(payload,setOpen)=>{
        try{
      const result=await axios.post('/auth/login',payload);
      
      console.log(result);
      localStorage.setItem('user',JSON.stringify(result.data.user));
        setUser(result.data.user);
        setOpen(false);
        }
        catch(err){
            console.log(err);
        }
      
    }

    const logout=async()=>{   
        setUser(false);
        localStorage.removeItem('user')      
    }
  return (
    <>  
          <userStatus.Provider value={{user,login,logout}}>
            {props.children}
          </userStatus.Provider>
    
    </>
  )
}
export const useAuth=()=>{return useContext(userStatus)};