import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import Hero from "./Hero.jsx";


class HeroGrid extends React.Component {
    static propTypes = {
        heroes: ImmutablePropTypes.list.isRequired,
        onClick: React.PropTypes.func,
        showSelected: React.PropTypes.bool,
        limit: React.PropTypes.number
    };

    render() {
        const limit = this.props.limit || this.props.heroes.size;

        return (
            <ul className="HeroGrid">
                {this.props.heroes.take(limit).map((hero, n) =>
                    <li key={n}>
                        <Hero hero={hero} onClick={this.props.onClick} showSelected={this.props.showSelected}/>
                    </li>
                )}
            </ul>
        )
    }
}

export default HeroGrid;
