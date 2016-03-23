import React from "react";
import { connect } from "react-redux";
import { requestData } from "../actions/api";
import { unSelectHero, selectHero } from "../actions/draft";

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

    onHeroClick(hero) {
        if (hero.get("selected")) {
            this.props.dispatch(unSelectHero(hero));
        } else {
            this.props.dispatch(selectHero(hero));
        }
    }

    onPickedHeroClick(hero) {
        this.props.dispatch(unSelectHero(hero));
    }

    render() {
        if (!this.props.heroes || !this.props.heroes.size) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <div>
                    Picked ({this.props.picked.size}):
                    <HeroGrid heroes={this.props.picked} onClick={this.onPickedHeroClick.bind(this)}/>

                    Suggest Ban ({this.props.suggestions.get("suggestedBans").size}):
                    <HeroGrid heroes={this.props.suggestions.get("suggestedBans")} limit={10}/>
                </div>

                <p>Pool:</p>
                <FilterableHeroGrid heroes={this.props.heroes} onClick={this.onHeroClick.bind(this)} showSelected={true}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(DraftPage);
