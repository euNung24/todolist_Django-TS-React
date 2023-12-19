import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const GoogleLoginButton = () => {
  return (
    <>
      <GoogleOAuthProvider
        clientId={
          process.env.GOOGLE_CLIENT_ID ||
          "246756656527-15h0r7veg0q4fcaqmbnmhdlo2s8j9ia3.apps.googleusercontent.com"
        }
      >
        <GoogleLogin
          onSuccess={(res) => {
            fetch(process.env.API_URL + "/google/login/callback/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: res.clientId,
                id_token: res.credential,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                localStorage.setItem("token", res.access_token);
                location.reload();
              })
              .catch((e) => {
                alert("서버 요청 중 오류가 발생했습니다.");
              });
          }}
          onError={() => {
            console.log("err");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;
