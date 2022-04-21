import {useEffect,useState} from 'react'
import axios from 'axios';
import SearchCity from "./SearchCity";
import {Spinner} from 'react-bootstrap'

function SearchCountry() {
    const [Data,setData]=useState([])
    const[searchval,setSearchval]=useState('')
    const[suggestions,setSuggestions]=useState([])
    const [currcun,setCurrcun]=useState('')
    const[loader,setLoader]=useState(false)
    useEffect(()=>{
         const url=`https://countriesnow.space/api/v0.1/countries/iso`;
         axios.get(url)
        .then(res=>res.data)
        .then(data=>setData(data.data))
         setLoader(true);
    },[])
    const handlerchange=(e)=>{
        let search=e.target.value
        setSearchval(search)
        let matches= []
            matches=Data.filter(data=>
             {
                 const regx=new RegExp(`${search}`,"gi")
                 return data.name.match(regx)
 
     })
     search ? setSuggestions(matches):setSuggestions([])
 }
     const handlersuggestion=(val)=>{
         setSearchval(val)
         setSuggestions([])
         setCurrcun(val)
     }
  return (
    <>
    {loader ? 
      <div className="md-form mt-5 searchInputs">
             <input className="form-control" type="text" value={searchval} onChange={handlerchange} placeholder="Search by country" aria-label="Search"/>
        </div> :<Spinner animation="border" variant="secondary" />}
         {suggestions.length !== 0 &&
        <div className='list-data'>
                {suggestions.map((data,i)=>
                <div key={i} className='list' onClick={()=>handlersuggestion(data.name)}>
                    <p>{data.name}</p>
                </div>
            )}
        </div>
        }
        {currcun ? <SearchCity currcun={currcun}/> :''}
    </>
  )
}

export default SearchCountry
