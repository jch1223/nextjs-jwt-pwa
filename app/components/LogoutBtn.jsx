import React from "react";
import Router from "next/router";

const LogoutBtn = ({ cookies, tokenHandler }) => {
  const onLogoutClick = () => {
    console.log("Logout");
    cookies.remove("token");
    tokenHandler && tokenHandler();
    Router.push("/");
  };

  return (
    <>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default LogoutBtn;
