import ReactDOM from 'react-dom';
import React from 'react';
import App from './client/App';
// import { Router } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  // <React.StrictMode>
    <Router >
      <App />
    </Router>,
  // </React.StrictMode>,
  document.getElementById('entry-point')
);
