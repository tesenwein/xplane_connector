import * as React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => (
    <div>
        <Header />

        <div className="container">
            <div className="col-sm">
                <Main />
            </div>
        </div>
    </div>
);
export default App;
