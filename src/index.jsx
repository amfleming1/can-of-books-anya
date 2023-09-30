import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const auth0Config = {
  domain: DOMAIN,
  clientId: CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
};

root.render(
  <Auth0Provider {...auth0Config}>
    <App />
  </Auth0Provider>
);
