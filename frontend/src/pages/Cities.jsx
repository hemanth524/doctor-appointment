import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

const Cities = () => {
  const { doctors, mdoctors, ddoctors, bdoctors } = useContext(Appcontext)

  const [selectedCity, setSelectedCity] = useState('mumbai')
  const [filterDoc, setFilterDoc] = useState([])

  const navigate = useNavigate()

  const getDoctorsByCity = (city) => {
    switch (city?.toLowerCase()) {
      case 'mumbai':
        return mdoctors || []
      case 'delhi':
        return ddoctors || []
      case 'bangalore':
        return bdoctors || []
      default:
        return doctors || []
    }
  }

  useEffect(() => {
    setFilterDoc(getDoctorsByCity(selectedCity))
  }, [selectedCity, mdoctors, ddoctors, bdoctors, doctors])

  const handleCityClick = (city) => {
    setSelectedCity(city.toLowerCase())
  }

  const cities = ['Mumbai', 'Delhi', 'Bangalore']

  return (
    <div className='px-4'>
      <p className='text-xl font-semibold text-gray-800 mt-4'>Browse Doctors by City</p>

      {/* City Filter Buttons */}
      <div className='flex flex-wrap gap-3 mt-6'>
        {cities.map(city => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className={`px-4 py-1.5 rounded border text-sm transition-all
              ${selectedCity === city.toLowerCase() ? 'bg-indigo-500 text-white' : 'border-gray-300 text-gray-700'}`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className='mt-8 grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-5 gap-y-6'>
        {filterDoc.length === 0 && <p>No doctors available in {selectedCity}.</p>}
        {filterDoc.map(doc => (
          <div
            key={doc._id}
            onClick={() => navigate(`/appointment/${doc._id}`)}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300'
          >
            {/* Image Container */}
            <div className="bg-blue-50 w-full h-60 md:h-56 flex items-center justify-center overflow-hidden">
              <img
                src={doc.image}
                alt={doc.name}
                className="h-full object-contain"
              />
            </div>

            {/* Doctor Info */}
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{doc.name}</p>
              <p className='text-gray-600 text-sm'>{doc.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cities
