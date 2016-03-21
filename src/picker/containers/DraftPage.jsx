import React from "react";
import { Map } from "immutable";
import { connect } from "react-redux";
import { requestData } from "../actions/api";

import Bans from "../components/Bans.jsx";
import Picks from "../components/Picks.jsx";
import HeroGrid from "../components/HeroGrid.jsx";
import FilterableHeroGrid from "../components/FilterableHeroGrid.jsx";


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
        if (!this.props.pool || !this.props.pool.size) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <Bans />
                <Picks />
                <p>Pool:</p>
                <FilterableHeroGrid heroes={this.props.heroes}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(DraftPage);
