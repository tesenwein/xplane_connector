import * as React from 'react';
import * as Spinner from "react-spinkit"

export interface AppProps {
}

export default class App extends React.PureComponent<AppProps, any> {
    render() {
        return (
            <Spinner name="line-scale" />
        );
    }
}
