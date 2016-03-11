import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

export default class Root extends React.Component {
    static propTypes = {
        store: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
        routes: React.PropTypes.node.isRequired
    };

    render() {
        const { store, history, routes } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        {routes}
                    </Router>
                </div>
            </Provider>
        );
    }
}
