import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Button } from "@material-ui/core";
import "./Login.css";

const DirectLogin = () => {
  const [userLoggedIn, setUserLoggedIn] = useContext(userContext);
  console.log('user context ',userLoggedIn);
  const history = useHistory();
  const location = useLocation();

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }


  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        
        const {displayName,email} =result.user;
        const signInGoogle = {name:displayName,email};
        setUserLoggedIn(signInGoogle);
        history.replace(from);
        // ...
        console.log('gmail user info ', signInGoogle);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

  };
  const handleFbSignIn=()=>{
    return 'fb';
  }
  const handleGithubSignIn=() =>{
    var provider = new firebase.auth.GithubAuthProvider();

    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = credential.accessToken;

    // The signed-in user info.
    // var user = result.user;
    const {displayName,email}=result.user;
    const signInGithub={name:displayName,email};
    setUserLoggedIn(signInGithub);
    history.replace(from);
    console.log('git hub user info ',email);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  }

const handleSubmit =()=>{
  console.log('clcickc ');
}


  return (
        <div className="from-style">
<form onSubmit={handleSubmit}>
  <div class="container">
    <h1>Login</h1>
    <hr/>

    <input type="text" placeholder="Enter Email" name="email" id="email" required />
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
    <hr />
    <input type="submit" value="Login" class="registerbtn"/>
    

  </div>
  
  <div class="container signin">
    <p>Don't have an account? <a href={'/login'}>Create an account</a>.</p>
  </div>
  <div class="container">

  <button onClick={handleGoogleSignIn} class="registerbtn">Continue with Google</button>
  <button onClick={handleGithubSignIn} class="registerbtn">Continue with Github</button>
  </div>
</form>

</div>

    );
};

export default DirectLogin;