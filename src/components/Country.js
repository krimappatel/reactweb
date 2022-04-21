import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from "@mui/material/Stack";
import City from './City';
import axios from 'axios'
import {Spinner} from 'react-bootstrap'

export default function Country() {
const[countries,setCountries]=useState([])
const[currcou,setCurrcou]=useState(null)
const[loader,setLoader]=useState(false)

useEffect(()=>{
    const url=`https://countriesnow.space/api/v0.1/countries/iso`;
         axios.get(url)
        .then(res=>res.data)
        .then(data=>{
         setCountries(data.data)
         })
         setLoader(true)
},[])
    return (
       <>
       {loader ?
      <Stack sx={{width:"auto",mt:6}}>
         <Autocomplete
            id="combo-box-demo"
            options={countries}
            getOptionLabel={(option)=>{ return option.name}}
            onChange={(event,value)=>{setCurrcou(value);}}
            sx={{width:"inherit",bgcolor:'white'}}
            renderInput={(params) => <TextField sx={{color:'white'}} {...params} placeholder='Search By Country' />}
         />
         {currcou? <City currcou={currcou.name}/>:''}
      </Stack>:
      <div className='spinner'><Spinner  animation="border" variant="secondary" /></div>}
      </>
    );
}
   
   