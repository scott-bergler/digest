import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

function App() {
  console.log("process.env.REACT_APP_GOOGLE_CLIENT_ID", process.env.REACT_APP_GOOGLE_CLIENT_ID)
  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: (response) => {
      console.log('Google sign-in successful', response);
    },
    onError: (error) => {
      console.error('Google sign-in error', error);
    },
    onLoading: () => {
      console.log('Google sign-in loading');
    },
  });

  return (
    <div>
      <GoogleLogin onClick={signIn} />
    </div>
  );
}

export default App;
