import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/UserActions";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const clientId = process.env.GOOGLE_CLIENT_ID;
  return (
    <>
      {clientId && (
        <GoogleOAuthProvider clientId={clientId}>
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
                  dispatch(
                    setUser({
                      token: res.access_token,
                      name: res.name,
                      profileImg: res.picture,
                    }),
                  );
                  // location.reload();
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
      )}
    </>
  );
};

export default GoogleLoginButton;
