import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Settings from "./components/settings";
import "./App.css";
import AuthorizeDiscordBtn from "./components/AuthorizeDiscordBtn";

function App() {
  const [profile, setProfile] = useState();
  const handleLogin = async (googleAuthUser) => {
    await getProfile(googleAuthUser);
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
        .then(async (res) => {
          console.log(res.data);
          const user = (
            await axios.post("http://localhost:3001/api/users/users", res.data)
          ).data;
          setProfile(user);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div className="main-container">
          <Settings profile={profile} setProfile={setProfile} />
          <div className="main-dash">
            <h2>Right hand content</h2>
            <AuthorizeDiscordBtn />
          </div>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default App;
