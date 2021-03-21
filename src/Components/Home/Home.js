import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import bgImg from "../../images/Bg.png";
import { red } from "@material-ui/core/colors";

import "./Home.css";
import Destination from "../Destination/Destination";
import VehicleType from "../VehicleType/VehicleType";

import fakedata from "./fakeData";

const Home = () => {
  const style = {
    display: "flex",
    margin: "20px",
    justifyContent: "space-between",
  };
  return (
    <div class="container modify">
      <div class="row">
        {fakedata.map((vehicle) => (
          <VehicleType
            key={vehicle.vehicleType}
            vehicle={vehicle}
          ></VehicleType>
        ))}
      
      </div>
    </div>
  );
};

export default Home;
