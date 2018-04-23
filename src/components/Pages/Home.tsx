import * as React from "react";
import { Col, Row } from "reactstrap";
import Search from "../Airport/Search";


export interface HomeProps {
}

export interface HomeState {
}

export default class Home extends React.Component<HomeProps, HomeState> {

    public constructor(props: HomeProps) {
        super(props);
    }

    public render() {

        return (
            <Row>
                <Col>
                    <Search />
                </Col>
            </Row>
        );
    }
}
