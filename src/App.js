import React from 'react';
import './styles.css';
import Map from './components/map';
// import data from "./components/data.json"

function App() {

  // const [dat, setData]  =useState([]);

//   useEffect(()=>{
//     try {
//       setData();

//     } catch (error) {
//       console.error(error);
//     }
//   },[])
//  dat.filter((item)=>{
//     if(item.region ==='Africa')
//    console.log(item.name.common)
//  })


  return <div className="App">
      <Map />
    </div>

}

export default App;
