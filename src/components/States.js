import context from './Context'
import {useState} from 'react'

function States(props) {
    const[currcou,setCurrcou]=useState(null)
    const [currciti,setCurrcity]=useState(null)
    const [latLon, setLetLon] = useState({lat:null,lon:null})
    const [loader,setLoader]=useState(true)

    const updatecurr =(val)=>{
        setCurrcou(val)
    }
    const updatecurrcity =(val)=>{
        setCurrcity(val)
    }
    const updateLatLon = (val) => {
        setLetLon({lat:val.lat, lon:val.lon})
    }
    const updateLoader=(val)=>{
        setLoader(val)
    }
    return (
        <context.Provider value={{country:currcou, city:currciti, latLon,loader, updatecurr, updatecurrcity, updateLatLon,updateLoader}}>
            {props.children}
        </context.Provider>
    )
}

export default States
