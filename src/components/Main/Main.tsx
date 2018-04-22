import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AiprotDetails from "../Airport/Details";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";


const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/airport/:icao" component={AiprotDetails} />
            <Route path="/settings" component={Settings} />
        </Switch>
    </main>
);

export default Main;
