import React from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { Admincontext } from '../context/Admincontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Doctorcontext } from '../context/Doctorcontext'

const Login = () => {

    const [state,setState]=useState('Admin')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const {setAtoken,backendurl}=useContext(Admincontext)
    const {setDToken}=useContext(Doctorcontext)

    const onsubmitHandler = async(event)=>{
        event.preventDefault()
        try{
            if(state === 'Admin'){
                const {data}=await axios.post(backendurl + '/api/admin/login',{email,password})
                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAtoken(data.token)
                } 
                else{
                    toast.error(data.message)
                }
            }
            else{

                const {data}=await axios.post(backendurl + '/api/doctor/login',{email,password})
                 if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                    console.log(data.token)
                } 
                else{
                    toast.error(data.message)
                }

            }
        }
        catch(error){

        }
    }

  return (
    <form onSubmit={onsubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-center p-8 min-w-[340px] sm:min-w-96 borde-hidden rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
            <p className='text-2xl font-semibold m-auto'><span className='text-violet-500'>{state}</span>Login</p>
           <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setemail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required />
           </div>
           <div className='w-full'>
            <p>Password</p>
            <input  onChange={(e)=>setpassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required />
           </div>
           <button className='bg-violet-500 text-white w-full py-2 rounded-md text-base '>Login</button>
           {
            state==='Admin'
            ?<p>Doctor Login? <span className='text-violet-500 underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
            :<p>Admin Login? <span className='text-violet-500 underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span> </p>
           }
        </div>
    </form>
  )
}

export default Login
