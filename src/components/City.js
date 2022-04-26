import React,{useEffect,useState,useContext} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Spinner} from 'react-bootstrap'
import Stack from "@mui/material/Stack";
import axios from 'axios'
import Weather from './Weather';
import {Box} from '@mui/system'
import context from './Context'

function City(props) {
    const {cities}=props
    const {city, updatecurrcity,latLon,updateLatLon}= useContext(context)
    const[latLonVal, setLatLonVal] = useState({ lat: latLon.lat, lon: latLon.lon });
    const [currcity,setCurrcity]=useState(city);
    const[citiesloader,setCitiesloader]=useState(true)

    useEffect(() => {
        updatecurrcity(currcity)
        setCitiesloader(true)
        if(currcity) {
          const getLatUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${currcity}&appid=254fe8952ba6d135cd7dc4baee714199`
          const getItem = async (url) => {
            const result = await axios.get(url);
            setLatLonVal({ lat: result.data[0].lat, lon: result.data[0].lon });
    
          };
          getItem(getLatUrl);
        }
        // eslint-disable-next-line
      }, [currcity]);

      useEffect(()=>{
        if(latLonVal){
            updateLatLon(latLonVal);
            setCitiesloader(false)
        };
        // eslint-disable-next-line
      },[latLonVal])
    

  return (
    <>
        {/* {citiesloader ? <div className='spinner'><Spinner  animation="border" variant="secondary"/></div>: */}
            <Stack sx={{width:"auto",mt:6}}>
                <Autocomplete
                    id="combo-box-demo"
                    options={cities}
                    value={currcity}
                    loading 
                    getOptionLabel={(option)=> option}
                    onChange={(event,value)=>{setCurrcity(value)}}
                    sx={{width:"inherit",bgcolor:'white'}}
                    renderInput={(params) => <TextField sx={{color:'white'}} {...params} placeholder="Search By City" />}
                    renderOption={(props,cities)=>(
                        <Box components='li' {...props} key={cities}>
                           {cities}
                        </Box>
                     )}
                />
                {city  ? citiesloader ? <div className='spinner'><Spinner  animation="border" variant="secondary"/></div>:<Weather/>:''}
            </Stack>
            {/* } */}
            {/* {currcity  ? <Weather currcity={currcity} latlon={latlon}/>:''} */}
    </>
  )
}

export default City
