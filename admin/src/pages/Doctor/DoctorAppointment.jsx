import React from 'react'
import { useContext } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { useEffect } from 'react'

const DoctorAppointment = () => {

  const {dToken,appointments,getAppointments}=useContext(Doctorcontext)

useEffect(()=>{
  if(dToken){
    getAppointments()
  }
},[dToken])
  return (
    <div>
        DOctorAppointments
    </div>
  )
}

export default DoctorAppointment
