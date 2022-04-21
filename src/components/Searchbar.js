import React from 'react'
import SearchCountry from './SearchCountry';
import Country from './Country'

function Searchbar() {
  return (
    <div className='weather-box'>
        <h3>Weather Info.</h3>
        <Country/>
        {/* <SearchCountry/> */}
    </div>
  )
}

export default Searchbar;
