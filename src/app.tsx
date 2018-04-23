import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./app.scss";
import Header from "./components/Header/Header";
import Main from "./components/Pages/Main";
import AirportIndex from "./lib/AirportIndex";
import ConfigStore from "./lib/ConfigStore";
import { XplaneEmmiter } from "./lib/XplaneConnector";


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

        XplaneEmmiter.connect()

        // Initialize the directory
        AirportIndex.build().then(() => {
            this.setState({ loaded: true })
        })
    }

    public render() {

        const MainFrame = this.state.loaded ? (
            <div>
                <Header />
                <Container fluid={true} id="main-container">
                    <Row>
                        <Col>
                            <Main />
                        </Col>
                    </Row>
                </Container>
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