import { BrowserRouter, Redirect } from 'react-router-dom';
import * as React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => (    
    <BrowserRouter basename="/">
        <div>
            <Header />
            <div className="container-fluid main-container">
                <div className="row">
                    <div className="col-sm">
                        <Main />
                    </div>
                </div>
            </div>
        </div>
    </BrowserRouter>
);
export default App;
