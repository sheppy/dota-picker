import React from "react";
import { Map } from "immutable";
import { connect } from "react-redux";
import { requestData } from "../actions/api";

import Bans from "../components/Bans.jsx";
import Picks from "../components/Picks.jsx";
import AllHeroes from "../components/AllHeroes.jsx";


function mapStateToProps(state) {
    return state;
}

class DraftPage extends React.Component {
    // Load initial items
    componentDidMount() {
        // Need to trigger this action
        this.props.dispatch(requestData());
    }

    render() {
        return (
            <div>
                <Bans />
                <Picks />
                <AllHeroes heroes={this.props.pool}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(DraftPage);
