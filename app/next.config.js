// next.config.js
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');

module.exports = withCSS(
  withSass({
    devIndicators: {
      autoPrerender: false,
    },
  })
);

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
});
