import React, { useState, useEffect } from "react";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import SignOut from "./SignOut";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const handleLogin = async (googleAuthUser) => {
    // setUser(googleAuthUser);
    await getProfile(googleAuthUser);
    console.log("PROFILE", profile);
    await axios.post("http://localhost:3001/users", {
      profile,
      message: "two",
    });
  };
  const signIn = useGoogleLogin({
    onSuccess: (response) => handleLogin(response),
    onError: (error) => console.error("Google sign-in error", error),
  });
  const getProfile = async (googleAuthUser) => {
    if (googleAuthUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAuthUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleAuthUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  // useEffect(getProfile, [profile]);
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
          <img src={profile.picture} alt="profile.username" />
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
