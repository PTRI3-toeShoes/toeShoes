import ReactDOM from 'react-dom';
import React from 'react';
import App from './client/App';
import { Router } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('entry-point')
);
