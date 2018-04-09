import "bootstrap";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

ReactDOM.render(
        <App />,
    mainElement
);
