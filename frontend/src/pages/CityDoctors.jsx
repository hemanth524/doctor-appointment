import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

const CityDoctors = () => {
  const { cityname: cityParam } = useParams()
  const navigate = useNavigate()

  const { doctors, mdoctors, ddoctors, bdoctors} = useContext(Appcontext) // Add other city data as needed

  const [selectedCity, setSelectedCity] = useState(cityParam || '')
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(true)

  const getDoctorsByCity = (city) => {
    switch (city?.toLowerCase()) {
      case 'mumbai':
        return mdoctors || []
      case 'delhi':
        return ddoctors || []
      case 'bangalore':
        return bdoctors || []
      default:
        return doctors || [] // All doctors or fallback
    }
  }

  const applyFilter = () => {
    if (selectedCity && selectedCity !== '') {
      setFilterDoc(getDoctorsByCity(selectedCity))
    } else {
      // Combine all doctors for "All Cities" view
      setFilterDoc([
        ...(doctors || []),
        ...(mdoctors || []),
        ...(ddoctors || []),
        ...(bdoctors || [])
      ])
    }
  }

  useEffect(() => {
    applyFilter()
  }, [selectedCity, doctors, mdoctors, ddoctors, bdoctors])

  const handleCityClick = (city) => {
    if (city === selectedCity) {
      setSelectedCity('')
      navigate('/cities')
    } else {
      setSelectedCity(city)
      navigate(`/cities/${city}`)
    }
  }

  const cities = ['Mumbai', 'Delhi', 'Bangalore']

  return (
    <div>
      <p className='text-gray-900'>Browse doctors by city:</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-10'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-violet-500 text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        <div className={`${showFilter ? 'flex' : 'hidden'} flex-col gap-4 text-sm text-gray-600 sm:flex`}>
          {cities.map(city => (
            <p
              key={city}
              onClick={() => handleCityClick(city.toLowerCase())}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${selectedCity.toLowerCase() === city.toLowerCase() ? 'bg-indigo-100 text-black' : ''}`}
            >
              {city}
            </p>
          ))}
        </div>

        <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-5 gap-y-6'>
          {filterDoc.length === 0 && <p>No doctors found for selected city.</p>}
          {filterDoc.map(item => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300'
            >
              <img className='bg-blue-50 w-full h-40 object-cover' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CityDoctors
