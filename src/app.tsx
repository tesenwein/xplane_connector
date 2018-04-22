import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./app.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import AirportIndexDirectory from "./lib/AirportIndex";
import ConfigStore from "./lib/ConfigStore";


//Setting some main Configurations
ConfigStore.setConfig("xplane.airports", "\\Custom Data\\GNS430\\navdata\\Airports.txt");

export interface AppStates {
    loaded: boolean
}

export interface AppProps {
}

export default class App extends React.Component<AppProps, AppStates> {

    public constructor(props: AppProps) {
        super(props)
        this.state = { loaded: false }
    }

    public componentDidMount() {

        // Initialize the directory
        AirportIndexDirectory.build().then(() => {
            this.setState({ loaded: true })
        })
    }

    public render() {

        const MainFrame = this.state.loaded ? (
            <div>
                <Header />
                <div className="container-fluid main-container">
                    <Main />
                </div>
            </div>
        ) : (
                <div>Loading</div>
            )

        return (
            <BrowserRouter basename="/">
                {MainFrame}
            </BrowserRouter>
        );
    }
}