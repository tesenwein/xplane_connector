import 'bootstrap';
import './app.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    mainElement
);
