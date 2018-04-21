import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./app.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ConfigStore from "./lib/ConfigStore";


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