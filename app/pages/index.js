import React from "react";
import Link from "next/link.js";

import axios from "axios";
import { Cookies } from "react-cookie";

import LogoutBtn from "../components/LogoutBtn.jsx";
import { serverUrl } from "../config.json"

// set up cookies
const cookies = new Cookies();
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get("token") || null,
    };
  }

  installPrompt = null;

  componentDidMount() {
    console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt', e => {
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
        return false;
      }
    })
  }

  installApp = async () => {
    console.log('clicked')
    console.log(this.installPrompt)

    if (!this.installPrompt) {
      alert('이미 다운로드 했습니다')
      return false;
    }

    this.installPrompt.prompt();

    let outcome = await this.installPrompt.userChoice;

    if (outcome.outcome == 'accepted') {
      console.log('App Installed');
    } else {
      console.log('App not installed');
    }
    // Remove the event reference
    this.installPrompt = null;
    // Hide the button
    // setInstallButton(false)
  };

  onLoginClick = async () => {
    console.log("Login called");
    const response = await axios.get(serverUrl + "/api/login");
    const token = response.data.token;
    cookies.set("token", token);
    this.setState({
      token: token,
    });
  };

  tokenHandler = () => {
    this.setState({
      token: null,
    });
  };

  render() {
    return (
      <div>
        <h2>Main page</h2>
        <br></br>
        <button onClick={() => this.onLoginClick()}>Get Token</button>
        <LogoutBtn cookies={cookies} tokenHandler={this.tokenHandler} />
        <button onClick={this.installApp}>다운로드</button>
        <br></br>
        <div>Token: {this.state.token}</div>
        <br></br>

        <Link href="/secret">
          <a>Secret page</a>
        </Link>
      </div>
    );
  }
}

export default Index;
