import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Details from "../Airport/Details";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";


const Main = () => (
    <main>
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/airport/:icao" component={Details} />
            <Route path="/settings" component={Settings} />
        </Switch>
    </main>
);

export default Main;
