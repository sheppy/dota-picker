import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import Hero from "./Hero.jsx";


class HeroGrid extends React.Component {
    static propTypes = {
        heroes: ImmutablePropTypes.list.isRequired
    };

    render() {
        return (
            <ul className="HeroGrid">
                {this.props.heroes.map((hero, n) =>
                    <li key={n}>
                        <Hero hero={hero}/>
                    </li>
                )}
            </ul>
        )
    }
}

export default HeroGrid;
