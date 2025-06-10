import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const Doctorcontext=createContext()

const Doctorcontextprovider=(props)=>{

    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')

    const [appointments,setappointments]=useState([])

  const getAppointments = async () => {
  try {
    // Change header key to lowercase 'dtoken'
    const { data } = await axios.get(backendurl + '/api/doctor/Appointments', {
      headers: {  dToken } // Use lowercase key
    });
    
    if (data.success) {
      setappointments(data.appointments.reverse())
      console.log(data.appointments.reverse())
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
    const value={
        dToken,setDToken,
        backendurl,
        appointments,
        setappointments,
        getAppointments

    }
    return (
        <Doctorcontext.Provider value={value}>
            {props.children}
        </Doctorcontext.Provider>
    )

}

export default Doctorcontextprovider

