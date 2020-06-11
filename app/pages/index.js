import React, { useState, useEffect, useRef } from "react";
import Link from "next/link.js";

import axios from "axios";
import { Cookies } from "react-cookie";

import LogoutBtn from "../components/LogoutBtn.jsx";
import { serverUrl } from "../config.json"
import fetch from "isomorphic-unfetch"

const Index = ({ promptInstall }) => {
  const cookies = new Cookies();

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(cookies.get("token"))
  }, [])

  const installApp = async () => {
    console.log(promptInstall)

    if (!promptInstall) {
      return;
    }

    promptInstall.prompt();

    let outcome = await promptInstall.userChoice;

    if (outcome.outcome == 'accepted') {
      console.log('App Installed');
    } else {
      console.log('App not installed');
    }
  };

  const onLoginClick = async () => {
    console.log("Login called");

    const token = await fetch(`${serverUrl}/api/login`)
      .then((response) => response.json())
      .then(data => data.token)
      .catch(error => {
        throw error
      })

    setToken(token);
    cookies.set("token", token);
  };

  return (
    <div>
      <h2>Main page</h2>
      <br></br>
      <button onClick={onLoginClick}>Get Token</button>
      <LogoutBtn cookies={cookies} />
      <button onClick={installApp}>다운로드</button>
      <br></br>
      <div>Token: {token}</div>
      <br></br>

      <Link href="/secret">
        <a>Secret page</a>
      </Link>
    </div>
  );
}

export default Index;
