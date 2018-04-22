import * as React from "react";
import { Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
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
            searchstring: "",
            airports: []
        }
    }

    public onSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchstring: event.target.value })

        if (this.state.searchstring.length > 1) {
            if (this.timeOutCheck) clearTimeout(this.timeOutCheck);
            this.timeOutCheck = setTimeout(() => {
                Airport.find(this.state.searchstring).then((rec) => {
                    console.log(rec.docs.length)
                    this.setState({ airports: rec.docs })
                }).catch((e) => {
                    console.log(e)
                });
            }, 200)
        }
    }

    public render() {

        const rows: JSX.Element[] = []
        let counter = 0;

        this.state.airports.map((airportItem) => {
            rows.push(<ShortInfo key={airportItem.toString()+counter} airport={airportItem} />);
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
                        {rows}
                    </Col>
                </Row>
            </div>
        );
    }
}
