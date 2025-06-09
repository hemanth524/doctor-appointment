import React, { useContext, useEffect, useState } from 'react'
import {Appcontext} from '../context/Appcontext'
import axios from 'axios'
import {toast} from 'react-toastify'
const MyAppointments = () => {

  const {backendurl ,token,getDoctorsData}=useContext(Appcontext)

  const [appointments,setAppointments]=useState([])
  const months=["JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEPT","OCt","NOV","DEC"]
  const slotDateFormat =(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" " + months[Number(dateArray[1]-1)] + " " + dateArray[2]
  }
  const getuserAppointments=async()=>{
    try {

      const {data}=await axios.get(backendurl + '/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)

      }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId)=>{
    try {
      
       const {data} = await axios.post(backendurl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
       if(data.success){
        toast.success(data.message)
        getuserAppointments()
        getDoctorsData()
       }
       else{
        toast.error(data.message)
       }

    } catch (error) {
      console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(()=>{
      if(token){
          getuserAppointments()
      }

  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-800 border-b'>My Appointment</p>
      <div>
        {appointments.map((item,index)=>(
          <div  className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-zinc-200' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image}/>
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-800 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time :</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
               {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded   hover:bg-violet-500 transition-all hover:text-white duration-300'>Pay Online</button>} 
                 {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 transition-all hover:text-white duration-300'>Cancel Appointment</button> }
                 {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 text-center'>Appointment Cancelled</button>}
              </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default MyAppointments

