import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from "@mui/material/Stack";
import {Box} from '@mui/system'
// import { getLatlon } from './Api';

function City({cities,currcity,setCurrcity}) {

  return (
    <>
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
            </Stack>
            
    </>
  )
}

export default City
