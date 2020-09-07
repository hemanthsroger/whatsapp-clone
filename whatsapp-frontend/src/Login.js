import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();
  //Method to get user info after signing in
  const handleSignin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({ type: "Set_User", user: result.user });
        console.log(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1-1.png"
          alt=""
        />

        <div className="login_text">Sign into Whatsapp</div>

        <Button type="submit" onClick={handleSignin}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
