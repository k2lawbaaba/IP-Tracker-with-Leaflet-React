import React, { useEffect, useState } from "react";


const IP_Address=(prop)=>{
    const [locate, setLocation] = useState([]);

    useEffect(()=>{
        var url=`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${prop.ip_address}`
        
        fetch(url)
        .then(result=> result.json())
        .then(data =>{
            setLocation(data)
        })
        .catch(error =>console.error(error));

    },[prop.ip_address]);


    return<>



         </>

}
export default IP_Address;