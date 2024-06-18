import React, { useState, useEffect } from "react";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import SignOut from "./SignOut";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

  const signIn = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (error) => console.error("Google sign-in error", error),
  });
  useEffect(() => {
    console.log("user", user);
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default App;
