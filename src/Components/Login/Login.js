import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Button } from "@material-ui/core";
import "./Login.css";
import DirectLogin from "./DirectLogin";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photoUrl: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });
  const [userLoggedIn, setUserLoggedIn] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  if (!firebase.apps.length) {
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

        const { displayName, photoURL, email } = result.user;
        const signInGoogle = {
          isSignIn: true,
          name: displayName,
          email: email,
          photoUrl: photoURL,
        };
        setUserLoggedIn(signInGoogle);
        history.replace(from);
        // ...
        console.log("gmail user info ", signInGoogle);
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

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signOut = {
          isSignIn: false,
          name: "",
          email: "",
          photoUrl: "",
          password: "",
          confirmPassword: "",
        };
        setUser(signOut);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleFbSignIn = () => {
    return "fb";
  };
  const handleGithubSignIn = () => {
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
        const { displayName, email, photoURL, password } = result.user;
        const signInGithub = {
          isSignIn: true,
          name: displayName,
          email: email,
          photoUrl: photoURL,
          password: password,
        };
        setUserLoggedIn(signInGithub);
        history.replace(from);
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

  const handleBlur = (e) => {
    let handleValid = true;
    if (e.target.name === "email") {
      handleValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isConfirmPassword = e.target.value.length > 6;
      const isHasNumber = /\d{1}/.test(e.target.value);
      handleValid = isConfirmPassword && isHasNumber;
      console.log("info ", handleValid);
    }
    if (e.target.name === "confirmPassword") {
      const isReConfirm = e.target.value.length > 6;
      const isReNum = /\d{1}/.test(e.target.value);
      handleValid = isReConfirm && isReNum;
    }
    if (handleValid) {
      // [...card,newCart]
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      console.log(newUserInfo);
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password === user.confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          var user = res.user;
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          // ...
          console.log("user create successful");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(errorMessage);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const { isSignIn, displayName, email, photoURL, password } = res.user;
          const signInGithub = {
            isSignIn: true,
            name: displayName,
            email: email,
            photoUrl: photoURL,
            password: password,
          };
          setUserLoggedIn(signInGithub);
          history.replace(from);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
    e.preventDefault();
  };

  return (
    <div className="from-style">
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">Sign In New User</label>
      <form onSubmit={handleSubmit}>
        <div class="container">
          <h1>Create an account</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          {newUser && (
            <input
              type="text"
              onBlur={handleBlur}
              placeholder="Enter Name"
              name="name"
              id="name"
              required
            />
          )}
          <input
            type="text"
            onBlur={handleBlur}
            placeholder="Enter Email"
            name="email"
            id="email"
            required
          />
          <input
            type="password"
            onBlur={handleBlur}
            placeholder="Enter Password"
            name="password"
            id="psw"
            required
          />
          {newUser && (
            <input
              type="password"
              onBlur={handleBlur}
              placeholder="Confrim Password"
              name="confirmPassword"
              id="psw-repeat"
              required
            />
          )}

          <hr />
          <input type="submit" class="registerbtn" value="Create an account" />
        </div>

        <div class="container signin">
          <p>
            Already have an account? <a href={"/directLogin"}>Login</a>.
          </p>
        </div>
        <div class="container">
          <button onClick={handleGoogleSignIn} class="registerbtn">
            Continue with Google
          </button>
          <button onClick={handleGithubSignIn} class="registerbtn">
            Continue with Github
          </button>
        </div>
      </form>
      <p style={{ color: "red" }}>{user.error} </p>
      {user.success && (
        <p style={{ color: "green" }}>User created Successfully</p>
      )}
    </div>
  );
};

export default Login;
