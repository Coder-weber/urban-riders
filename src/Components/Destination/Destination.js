import { DragHandle } from "@material-ui/icons";
import googleMapReact from "google-map-react";
import React, { useState } from "react";
import { useParams } from "react-router";
 import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import vehicleData from "../fakeData/fakeData";

const Destination = () => {
  const { vehicleType } = useParams();
    const [find,setFind] =useState();
    
    const handleFind =()=>{
      const vhF= vehicleData.find(v=> v===vehicleType);
      setFind(vhF);
      
    }
    return (
    <div class="container">
      <div class="row">
        <div class="col-md-4 d-flex">
          <form style={{width:'500px' ,float:'left',marginRight:'30px'}} onSubmit={()=>handleFind}>
            <p>Pick From</p>
            <input type="text"/>
            <p>Pick To</p>
            <input type="text"/>
            <input type="submit" value="Submit"/>
          </form>
          
        </div>
        <div class="col-md-8 d-flex"> 
          <p>Google map</p>

<iframe src="https://www.google.com/maps/d/embed?mid=1EIyBVJurFBfi4Il130fSdgEAnIU" width="640" height="480"></iframe>

        </div>
      </div>
    </div>
  );
};

export default Destination;
