import React from "react";
import ReactDOM from "react-dom";

import history from "./picker/services/history";
import routes from "./picker/routes";
import Root from "./picker/containers/Root";
import reducers from "./picker/reducers";
import configureStore from "./picker/store";

const store = configureStore(reducers);

ReactDOM.render(<Root store={store} history={history} routes={routes}/>, document.getElementById("app"));
