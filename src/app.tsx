import 'bootstrap';
import './app.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CurrentTime from './components/CurrentTime';

const mainElement = document.createElement('div');

document.body.appendChild(mainElement);

ReactDOM.render(<CurrentTime />, mainElement);
