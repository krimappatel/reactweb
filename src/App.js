import './App.css';
import { useEffect,useState,useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from "@mui/material/Stack";
import City from './components/City';
import axios from 'axios'
import {Spinner} from 'react-bootstrap'
import {Box} from '@mui/system'
import context from './components/Context'

function App() {
const {country,updatecurr,updatecurrcity}=useContext(context)
const[countries,setCountries]=useState([])
const[currcou,setCurrcou]=useState(country)
const [cities,setCities]=useState([]);
const[loadingcountries,setLoadingcountries]=useState(true)
const[citiesloader,setCitiesloader]=useState(true)

  useEffect(()=>{
    setLoadingcountries(true)
     const url=`https://countriesnow.space/api/v0.1/countries/iso`;
          axios.get(url)
         .then(res=>res.data)
         .then(data=>{
          setCountries(data.data)
          setLoadingcountries(false)
          })
    
 },[])
 useEffect(()=>{ 
    if(country)
    {
       setCitiesloader(true)
       updatecurrcity('')
       setCities([])
       
        const url=`https://countriesnow.space/api/v0.1/countries/cities`;
            axios.post(url,{"country":country})
        .then(res=>res.data)
        .then(data=>setCities(data.data))  
        
        setCitiesloader(false) 
        
    } 
 },[country])
 useEffect(()=>{
    if(currcou){
       updatecurr(currcou)
       setCitiesloader(true)
    // eslint-disable-next-line
    }
 },[currcou])
 
 const getCurrcou=(val)=>{
    setCurrcou(val.name) 
 }
 
  return (
    <div className='weather-box'>
        <h3>Weather Info.</h3>
        {loadingcountries  ? <div className='spinner'><Spinner  animation="border" variant="secondary" /></div>:
         <Stack sx={{width:"auto",mt:6}}>
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
            {currcou ? (
              citiesloader ? 
              <div className='spinner'><Spinner  animation="border" variant="secondary" /></div>
              :<City cities={cities} />
              ):''}
         </Stack>
         }
    </div>
  );
}

export default App;
