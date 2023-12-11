import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import React from "react";

const GoogleLoginButton = () => {
  const clientId = '246756656527-15h0r7veg0q4fcaqmbnmhdlo2s8j9ia3.apps.googleusercontent.com'
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res.clientId);
            console.log(res.credential);
            fetch('http://localhost:8000/google/login/', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                access_token: res.clientId,
                id_token: res.credential
              })
            }).then(res => res.json())
              .then(res => console.log(res));
          }}
          onError={() => {
            console.log('err');
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton
