import React from "react";
import { Route, IndexRoute } from "react-router";
import DraftPage from "./containers/DraftPage"
import App from "./containers/App"

export default (
    <Route path="/" component={App}>
        <IndexRoute component={DraftPage}/>
    </Route>
);
