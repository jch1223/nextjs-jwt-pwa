import React, { useState, useEffect } from 'react';
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'react-app-polyfill/ie11';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setPromptInstall(e);
      console.log("Listening for Install prompt");
      console.log("Install Prompt fired");
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return <Component {...pageProps} promptInstall={promptInstall} />;
}

export default MyApp;
