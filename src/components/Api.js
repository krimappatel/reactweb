import axios from 'axios';

const getApi=async()=>{
      const url='https://countriesnow.space/api/v0.1/countries/iso';
      const response= await axios.get(url)
      return  response
}
export default getApi;

