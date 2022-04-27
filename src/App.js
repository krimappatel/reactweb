import './App.css';
import { useEffect,useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from "@mui/material/Stack";
import City from './components/City';
import {Spinner} from 'react-bootstrap'
import {Box} from '@mui/system'
import {getCities, getCountries,getLatlon,getWeather} from './components/Api';
import Weather from './components/Weather.js';


function App() {
const[countries,setCountries]=useState([])
const[currcou,setCurrcou]=useState(null)
const [currcity,setCurrcity]=useState(null);
const [cities,setCities]=useState([]);
const[loadingcountries,setLoadingcountries]=useState(true)
const[citiesloader,setCitiesloader]=useState(true)
const[weatherloader,setWeatherloader]=useState(true)
const[latLon, setLatLonVal] = useState({ lat: null, lon: null });
const[weather,setWeather]=useState([]);

  useEffect(()=>{  
    (async () => {
			const countries = await getCountries();
      setLoadingcountries(false)
			setCountries(countries)  
		})();
    
 },[])
 useEffect(()=>{ 
   (async()=>{
     if(currcou){
      setCurrcou(currcou)
      setCitiesloader(true)
      setCurrcity('')
      setCities([])
      const cities= await getCities(currcou);
      setCitiesloader(false) 
      setCities(cities)
     }  
   }
   )();
   
    // if(country)
    // {
    //    setCitiesloader(true)
    //    updatecurrcity('')
    //    setCities([])
       
    //     const url=`https://countriesnow.space/api/v0.1/countries/cities`;
    //         axios.post(url,{"country":country})
    //     .then(res=>res.data)
    //     .then(data=>setCities(data.data))  
        
    //     setCitiesloader(false) 
        
    // } 
 },[currcou])

 useEffect(() => {
  (async()=>{
    setCurrcity(currcity)
    // setWeatherloader(true)
    if(currcity) {
      const latlon =  await getLatlon(currcity)
      console.log(latlon)
      setLatLonVal({lat:latlon.lat,lon:latlon.lon});
    }
  })();
  }, [currcity]);

  useEffect(()=>{
    (async()=>{
     setWeatherloader(true)
     if(latLon.lat && latLon.lon){
         const weather= await getWeather(latLon)
         setWeather(weather)
         setWeatherloader(false)       
     }  
    })();
      
  },[latLon])

 
 const getCurrcou=(val)=>{
    setCurrcou(val.name) 
 }
 
  return (
    <div className='weather-box'>
        <h3>Weather Info.</h3>
        {loadingcountries  ? <div className='spinner'><Spinner  animation="border" variant="secondary" /></div>:
         <Stack sx={{width:500,margin:6}}>
            <Autocomplete
               id="combo-box-demo"
               options={countries}
               loading
               // value={currcou}
               getOptionLabel={(option)=>  option.name}
               onChange={(event,value)=>(value!==null) ? getCurrcou(value):getCurrcou('')}
               sx={{width:"inherit",bgcolor:'white'}}
               renderInput={(params) => <TextField sx={{color:'white'}} {...params} placeholder='Search By Country' />}
               renderOption={(props,countries)=>(
                  <Box components='li' {...props} key={countries.name}>
                     {countries.name}
                  </Box>
               )}
            />    
            {currcou && (
              citiesloader ? 
              <div className='spinner'><Spinner  animation="border" variant="secondary" /></div>
              :<City cities={cities} currcity={currcity} setCurrcity={setCurrcity}/>
              )}

              {currcity && (
                weatherloader ? (
                <div className='spinner'><Spinner  animation="border" variant="secondary"/></div>
                )
                :<Weather weather={weather}/>
                )
                }
                
         </Stack>
         }
    </div>
  );
}

export default App;
