import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Details from "../Airport/Details";
import Home from "../Pages/Home";
import Settings from "../Settings/Settings";
import InFlightInformation from "../Flight/InFlightInformation";


const Main = () => (
    <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/inflight" component={InFlightInformation} />
        <Route path="/airport/:icao" component={Details} />
        <Route path="/settings" component={Settings} />
    </Switch>
);

export default Main;
