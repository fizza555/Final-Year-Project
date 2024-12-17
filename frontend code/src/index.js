// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './Components/UserContext'; // Import the UserProvider

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
