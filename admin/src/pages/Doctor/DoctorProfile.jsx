import React, { useContext, useEffect, useState } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { Appcontext } from '../../context/Appcontext'
import {toast} from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const {dToken, profileData,setprofileData,getprofileData,backendurl}=useContext(Doctorcontext)
  const {currency}=useContext(Appcontext)

  const [isEdit ,setisEdit]=useState(false)

  const updateProfile = async()=>{

        try {

          const updateData={
            address:profileData.address,
            fees:profileData.fees,
            available:profileData.available
          }

          const {data}=await axios.post(backendurl + '/api/doctor/update-profile',updateData,{headers:{dToken}})
          if(data.success){
            toast.success(data.message)
            setisEdit(false)
            getprofileData()

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
      getprofileData()
  },[dToken])

  return profileData &&  (
    <div className='flex flex-col gap-4 m-5'>
        <div>
          <div>
            <img className='bg-violet-500 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
          </div>
          <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
            <p className='flex item-center gap-2 text-3xl font-medium text-gray-700 '>{profileData.name}</p>
            <div className='flex items-center gap-2 mt-1 text-gray-600'>
             <p>{profileData.degree} -{profileData.speciality}</p>
             <button  className='py-0.5 px-2 border  text-xs rounded-full'>{profileData.experience}</button>
              </div>
              <div>
                <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
              </div>
              <p className='text-gray-600 font-medium mt-4'>
                appointment fee: <span className='text-gray-800'>{currency}  { isEdit ? <input type='number' onChange={(e)=>setprofileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}/> :profileData.fees}</span>
              </p>

              <div className='flex gap-2 py-2'>
                <p>Address : </p>
                <p className='text-sm '>
                   { isEdit ? <input type='text' onChange={(e)=>setprofileData(prev=> ({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} /> :profileData.address.line1}
                  <br/>
                  {isEdit ? <input type='text' onChange={(e)=>setprofileData(prev=> ({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} /> :profileData.address.line2}
                </p>
              </div>
              <div className='flex gap-1 pt-2'> 
                <input onChange={()=>isEdit && setprofileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" name='' />
                <label htmlFor=''>Available</label>
              </div>
              {
                isEdit
                ?<button  onClick={updateProfile} className='px-4 py-1 border border-violet text-sm rounded-full mt-5 hover:bg-violet-500 hover:text-white transition-all'>Save</button>
                : <button onClick={()=>setisEdit(true)} className='px-4 py-1 border border-violet text-sm rounded-full mt-5 hover:bg-violet-500 hover:text-white transition-all'>Edit</button>
              }

          </div>
        </div>
    </div>
  )
}

export default DoctorProfile
