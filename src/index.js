import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Store from "./Store";


ReactDOM.render(<BrowserRouter><Store><App /></Store></BrowserRouter>, document.getElementById('root'));
