import { DragHandle } from "@material-ui/icons";
import googleMapReact from "google-map-react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import vehicleData from "../fakeData/fakeData";

const Destination = () => {
  const { vehicleType } = useParams();
  
  const [find, setFind] = useState([]);
  console.log('out side ', find);
  const handleFind = (vehicleType) => {
  
    const vehicleAdd = [];
    console.log('vehicleAdd ',vehicleAdd);
    const newAdd = vehicleData.filter((vh) => vh.vehicleType === vehicleType);
    
    const final = [...vehicleAdd, newAdd];
    
    console.log('final ',final);
    console.log('find sta ',find);
    console.log('arr data ',newAdd);
    const grap = newAdd.map(vh=>vh);
    setFind(grap);
    console.log('grap ', grap);
    const {price,imgUrl}=grap[0];
    console.log(price,imgUrl);
  };
  return (

    <div class="container">
      <div class="row">
        <div class="col-4">    
        
          <p>Pick From</p>
          <input type="text" />
          <p>Pick To</p>
          <input type="text" />
          <button onClick={() => handleFind(vehicleType)}>Submit</button>
    
          {find.map(vh=>
              <div class="row" style={{marginTop:'5px'}} >
                <div class="col-6"><img style={{width:'50px',height:'50px',marginBottom:'5px'}} src={vh.imgUrl} alt=""/></div>
                <div class="col-6">
              <p>${vh.price} </p></div>
              
              </div>)}
        
                
          
        </div>
        <div class="col-8">
          <p>Google map</p>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1EIyBVJurFBfi4Il130fSdgEAnIU"
            width="640"
            height="480"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Destination;
