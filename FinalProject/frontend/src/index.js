import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
  .then(function(registration) {
    // Successful registration
    console.log('Hooray. Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    // Failed registration, service worker won’t be installed
    console.log('Whoops. Service worker registration failed, error:', err);
  });
 }

// WEBPACK FOOTER //
// ./src/index.js