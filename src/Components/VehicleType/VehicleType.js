import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import WcIcon from "@material-ui/icons/Wc";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const VehicleType = (props) => {
  const { title, vehicleType, imgUrl } = props.room;
  console.log();
  const classes = useStyles();
  const history = useHistory();
  const handleBook = (vehicleType) => {
    history.push(`/destination/${vehicleType}`);
  };

  return (
    <div>
    <button onClick={()=>handleBook(vehicleType)}>
      <img style={{ width: "100px", height: "40px" }} src={imgUrl} alt="" />
      <p>Title {vehicleType} </p>
      </button>
    </div>
  );
};

export default VehicleType;
