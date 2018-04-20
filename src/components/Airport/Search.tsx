import * as React from "react";
import { Alert } from "reactstrap"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import "./Search.scss"

import ConfigStore from "../../flux/stores/ConfigStore";
import Airport from "../../lib/Airport"

export interface SearchProps {
}

export interface SearchState {
    searchstring:string
}

export default class Search extends React.Component<SearchProps, SearchState> {

    public constructor(props: SearchProps) {
        super(props);

        this.state = {
            searchstring: ""
        }

        
        this.onSearch = this.onSearch.bind(this);
    }

    public onSearch(event:React.ChangeEvent<HTMLInputElement>){
        this.setState({searchstring:event.target.value})
        console.log("search",event.target.value)
        Airport.find(event.target.value).then((rec)=>{
            console.log(rec)
        });
    }

    public render() {

        return (
            <div className="row">
                <div className="col-sm">
                    <Form>
                        <FormGroup>
                            <Label for="search">Search:</Label>
                            <Input
                                type="text"
                                name="searchstring"
                                id="searchstring"
                                onChange={(e) => this.onSearch(e) }
                                value={this.state.searchstring}
                            />
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}
