import axios from 'axios';

export const getCountries=async()=>{
      const url='https://countriesnow.space/api/v0.1/countries/iso';
      const response= await axios.get(url);
      return  response.data.data;
}
export const getCities=async(country)=>{
      const url=`https://countriesnow.space/api/v0.1/countries/cities/q?country=${country}`;
      const response= await axios.get(url)
      return response.data.data;
}
export const getLatlon=async(currcity)=>{
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${currcity}&appid=254fe8952ba6d135cd7dc4baee714199`
          const response =  await axios.get(url);
          return response.data[0]
            // setLatLonVal({ lat: result.data[0].lat, lon: result.data[0].lon });
}
export const getWeather=async(latlon)=>{
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=254fe8952ba6d135cd7dc4baee714199`;
            const response=await axios.get(url)
            return response.data.weather[0]
}