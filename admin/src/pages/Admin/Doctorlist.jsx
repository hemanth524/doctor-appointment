import React from 'react'
import { useContext } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { useEffect } from 'react'

const Doctorlist = () => {

  const {doctors,aToken,getallDoctors,changeAvailability}=useContext(Admincontext)
  
  useEffect(()=>{
      if(aToken){
        getallDoctors()
      }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
     <h1 className='text-lg font-medium'>ALL DOCTORS</h1>
     <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
      {
        doctors.map((item,index)=>(
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-violet-500 transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p  className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm '>{item.speciality}</p>
              </div>
              <div className='mt-2 flex flex-items gap-1 text-sm mb-2 justify-center'>
                <input onChange={()=>changeAvailability(item._id)} type='checkbox' checked={item.available}/>
                <p>Available</p>
                </div>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default Doctorlist
