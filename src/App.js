import { Map } from "@material-ui/icons";
import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Blog from "./Components/Blog/Blog";
import Contact from "./Components/Contact/Contact";
import Destination from "./Components/Destination/Destination";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import DirectLogin from "./Components/Login/DirectLogin";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import bgImg from "./images/Bg.png";

export const userContext =createContext();



function App() {
const [userLoggedIn, setUserLoggedIn] =useState({});


return (
<userContext.Provider value={[userLoggedIn,setUserLoggedIn]} >

<Router>
     
        <Header></Header>      

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/home">
            <Home></Home>
          </PrivateRoute>
          <PrivateRoute path="/destination/:vehicleType">
          <Destination></Destination>
         </PrivateRoute>
         <PrivateRoute path="/destination">
          <Destination></Destination>
         </PrivateRoute>
          <Route path="/blog">
          <Blog></Blog>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/login">
          <Login></Login>
          </Route>
          <Route path="/directLogin">
          <DirectLogin></DirectLogin>
          </Route>
        <Route path="/map">
            <Map></Map>
          </Route>    
        </Switch>
      
    </Router>
    </userContext.Provider>
  );
}

export default App;
