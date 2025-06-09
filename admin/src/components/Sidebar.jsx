import React from 'react'
import { useContext } from 'react'
import { Admincontext } from '../context/Admincontext'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {aToken}=useContext(Admincontext)

  return (
    <div className='min-h-screen bg-white border-right'>
      {
        aToken && <ul className='text-gray-800 mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-violet-300 text-gray-800 border-r-4 border-violet-500':''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt=""/>
                <p>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-violet-300 text-gray-800  border-r-4 border-violet-500':''}`} to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt=""/>
                <p>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-violet-300 text-gray-800 border-r-4 border-violet-500':''}`} to={'/add-doctor'}>
                <img src={assets.add_icon} alt=""/>
                <p>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-violet-300 text-gray-800  border-r-4 border-violet-500':''}`} to={'/doctor-list'}>
                <img src={assets.people_icon} alt=""/>
                <p>Doctor List</p>
            </NavLink>
        </ul>
        
      }
    </div>
  )
}

export default Sidebar
