import * as React from "react";

import Search from "../Airport/Search"
import FullInfo from "../Flight/FullInfo"

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
            <div className="row">
                <div className="col-sm">
                    <FullInfo />
                    <Search />
                </div>
            </div>
        );
    }
}
