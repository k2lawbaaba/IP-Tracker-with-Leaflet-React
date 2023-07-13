import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer,Popup, Marker, ZoomControl } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import KeyboardArrowRightIcon   from '@mui/icons-material/KeyboardArrowRight';
import Details from "./Details";
import {publicIpv4} from 'public-ip'
import Markerposition from './Markerposition'
import Card from "./Card"

const Mapping=(prop)=>{

  
    const [cord, setCord] = useState([0,0]);
    const [userEnteredIP, setUserIP]= useState('');
    const [locate, setLocate]= useState(null);
    const [hostIPAddress, setIHostIP]= useState('')
    const [warningMsg, setMessage]= useState('');
    

  // Getting the IP address of the host system
  useEffect(()=>{
    try {
      const hostIp = async()=>{
        const p= await publicIpv4();
        setIHostIP(p);
        }
      hostIp();
    } catch (error) {
      console.error("Error: "+ error)
      // setMessage()
    }
   
  })
   

    //Using regex to check for valid IP address and domain name
    const ipAddressRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const domainRegex= /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
    // const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
    
    useEffect(()=>{
        var url=`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${hostIPAddress}`
      //  var URL="https://geo.ipify.org/api/v2/country,city?apiKey=at_pUnbdDn2GzEXj8dZykl1aCK5azIU5&ipAddress=4.8.8.8"

       
       try {
          const loadData= async()=>{
          const result = await fetch(url);
          const data= await result.json();
          setLocate(data);
          updateMap(data.location.lat, data.location.lng)
          }
          loadData();
        } 
        
        catch (error) {
          console.error(error);
        }
    },[hostIPAddress]);     

    const grabDataFromAPI= async()=>{

    var url='';
      try {
        if(ipAddressRegex.test(userEnteredIP)){
           url=`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}
          &
          ${ `ipAddress=${userEnteredIP}`}`
          }
          else if(domainRegex.test(userEnteredIP)){
             url=`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}
            &
            ${`domain=${userEnteredIP}`}`
          }
            else{
               setMessage("Incorrect IP address or Domain name");
        }
        
        const result = await fetch(url);
        const data= await result.json();
        setLocate(data);
        updateMap(data.location.lat, data.location.lng);
        setMessage('');
        
      } catch (error) {
        console.error(error);
      setMessage("Incorrect IP address or Domain name");

      }
    }
 
    

    //creating icon for marker on the map
    const customIcon = new Icon({
        iconUrl: require('../images/location.png'),
        iconSize: [33, 33]
      })

      // updating the latitude and longitude from the API
      const updateMap = (lat, lng) => {
        try {
          setCord([lat, lng]);
          setMessage('');
        } catch (error) {
        setMessage("Incorrect IP address or Domain name");
          
        }
      };

      //dealing withh user query
      const handleUSerIP=(evt)=> setUserIP(evt.target.value);
      
      //Deal with user input or query
      const dealWithUserInput=(evt)=>{
        evt.preventDefault();
        grabDataFromAPI();
        setUserIP('');
      };  

return<div className='map' id='map'>
 {
    locate && (
    <>
      <div className="header">
        <h3>IP address Tracker</h3>
            <form onSubmit={dealWithUserInput}>
            <div className="searchBar">
            <input 
             placeholder="Search for an IP address"
             type="text" 
             value={userEnteredIP}
             onChange={handleUSerIP}
             autoFocus
              />
            <button type="submit" onClick={dealWithUserInput}><KeyboardArrowRightIcon sx={{paddingTop:"10px", borderRadius:"50px", width:"20px" }} fontSize="medium"/></button>
            </div>
            </form>
            <p className="warning">{warningMsg}</p>
       
            <div className="infoTray">
                <Details title="IP ADDRESS" info={locate.ip} /><hr/>
                <Details title="LOCATION" info={`${locate.location.city}, ${locate.location.region}, ${locate.location.country} ${locate.location.postalCode}`}/><hr/>
                <Details title="TIMEZONE" info={`UTC${locate.location.timezone}`} /><hr/>
                <Details title="ISP" info={locate.isp} />
            </div>
    </div>
    <MapContainer center={cord} zoom={13} zoomControl={true} scrollWheelZoom={true} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
        <ZoomControl position='bottomright' />

  <Markerposition cord={cord} icon={customIcon}  
  
  card={
  <Card 
  src="../images/location.png"
  cord={`${locate.location.lat},  ${locate.location.lng}`}
  domain={locate.as.domain}
  asn={locate.as.asn}
  name={locate.as.name}
  route={locate.as.route}
  type={locate.as.type}

  />}/>
</MapContainer>
     </>  
  )}
</div>
}
export default Mapping;