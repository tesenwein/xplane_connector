import { BrowserRouter, Redirect } from "react-router-dom";
import * as React from "react";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ConfigStore from "./flux/stores/ConfigStore"

import "./app.scss";


//Setting some main Configurations
ConfigStore.setConfig("xplane.airports", "\\Custom Data\\GNS430\\navdata\\Airports.txt");


const App = () => (
    <BrowserRouter basename="/">
        <div>
            <Header />
            <div className="container-fluid main-container">
                <Main />
            </div>
        </div>
    </BrowserRouter>
);
export default App;
