import * as React from "react";
import { Col, Form, FormGroup, Input, Label, Row, ListGroupItemHeading, ListGroupItem, ListGroup } from "reactstrap";
import Airport, { AirportInterface } from "../../lib/Airport";
import "./Search.scss";
import ShortInfo from "./ShortInfo";


export interface SearchProps {
}

export interface SearchState {
    searchstring: string
    airports: AirportInterface[]
}


export default class Search extends React.Component<SearchProps, SearchState> {

    private timeOutCheck: any

    public constructor(props: SearchProps) {
        super(props);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            searchstring: localStorage.getItem("lastSearchIcao") || "",
            airports: []
        }

        if (this.state.searchstring.length > 2) {
            this.searchAirports()
        }
    }

    public onSearch(event: React.ChangeEvent<HTMLInputElement>) {
        localStorage.setItem("lastSearchIcao", event.target.value)
        this.setState({ searchstring: event.target.value })

        if (this.state.searchstring.length > 2) {
            if (this.timeOutCheck) clearTimeout(this.timeOutCheck);
            this.timeOutCheck = setTimeout(() => {
                this.searchAirports();
            }, 200)
        }
    }

    private searchAirports() {
        Airport.find(this.state.searchstring).then((rec) => {
            this.setState({ airports: rec.docs });
        }).catch((e) => {
            console.warn(e);
        });
    }

    public render() {

        const rows: JSX.Element[] = []
        let counter = 0;

        this.state.airports.map((airportItem) => {
            rows.push(<ListGroupItem key={"title_" + airportItem.toString() + counter}><ShortInfo key={airportItem.toString() + counter} airport={airportItem} /></ListGroupItem>);
            counter = counter + 1
        });

        return (
            <div>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="search">Search:</Label>
                                <Input
                                    type="text"
                                    name="searchstring"
                                    id="searchstring"
                                    onChange={this.onSearch}
                                    value={this.state.searchstring}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItemHeading>
                                Results
                            </ListGroupItemHeading>
                            {rows}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}
