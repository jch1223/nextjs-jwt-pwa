import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

const APP_NAME = 'next-pwa example';
const APP_DESCRIPTION = 'This is an example of using next-pwa plugin';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {/* pwa 예제 테그 */}
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
          />

          <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/icons/favicon.ico' />
          {/* Step 5: Output the styles in the head  */}
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          {/* 메타테그 */}
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'></meta>
          <meta name='naver-site-verification' content='5a2b133713b38a2581d3bc0c5a223fa05f542834' />
          <meta name='application-name' content='프론트엔드 개발자 장철희 ㅣ JangChulHee' />
          <meta name='msapplication-tooltip' content='프론트엔드 개발자 장철희 ㅣ JangChulHee' />
          <meta
            id='meta_og_title'
            property='og:title'
            content='프론트엔드 개발자 장철희 ㅣ JangChulHee'
          />
          <meta name='description' content='프론트엔드 개발자 장철희 ㅣ JangChulHee' />
          <meta property='og:description' content='프론트엔드 개발자 장철희 ㅣ JangChulHee' />
          <meta name='keywords' content='프론트엔드, 개발자, 장철희' />
          <link rel='icon' href='/static/logo/favicon.png' type='image/x-icon' />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap'
            rel='stylesheet'
          ></link>
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          />
          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
