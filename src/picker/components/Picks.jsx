import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import HeroGrid from "./HeroGrid.jsx";


class Picks extends React.Component {
    static propTypes = {
        heroes: ImmutablePropTypes.list.isRequired
    };

    render() {
        const pickedHeroes = this.props.heroes.filter(hero => hero.get("selected"));

        return (
            <div className="Picks">
                <p>Picks:</p>
                <HeroGrid heroes={pickedHeroes}/>
            </div>
        )
    }
}

export default Picks;
