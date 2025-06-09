import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const Admincontext=createContext()

const Admincontextprovider=(props)=>{

    const [aToken,setAtoken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]=useState([])
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const getallDoctors=async()=>{
        try {
            const{data}=await axios.post(backendurl + '/api/admin/all-doctors',{},{headers:{admintoken:aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability=async(docId)=>{
        try {
            
            const {data}=await axios.post(backendurl + '/api/admin/change-availability',{docId},{headers:{admintoken:aToken}})
            if(data.success){
                toast.success(data.message)
                getallDoctors()
            }
            else{
                toast.error(data.message)
            }
            

        } catch (error) {
            toast.error(error.message)
        }
    }

    const value={
        aToken,setAtoken,
        backendurl,
        doctors,
        getallDoctors,
        changeAvailability
    }
    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )

}

export default Admincontextprovider

