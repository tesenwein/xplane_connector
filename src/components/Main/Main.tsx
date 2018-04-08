import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Settings from '../Settings/Settings';

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/settings" component={Settings} />
        </Switch>
    </main>
);

export default Main;
