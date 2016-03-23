import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import SearchBar from "./SearchBar.jsx";
import HeroGrid from "./HeroGrid.jsx";


class FilterableHeroGrid extends React.Component {
    static propTypes = {
        heroes: ImmutablePropTypes.list.isRequired,
        onClick: React.PropTypes.func,
        showSelected: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            filterText: ""
        };
    }

    onFilterChange(event) {
        this.setState({
            filterText: event.target.value.toLowerCase()
        });
    }

    filterHeroByName(hero) {
        return hero.get("name", "").toLowerCase().indexOf(this.state.filterText) !== -1
    }

    render() {
        const filteredHeroes = this.props.heroes.filter(this.filterHeroByName.bind(this));

        return (
            <div>
                <SearchBar filterText={this.state.filterText} onChange={this.onFilterChange.bind(this)}/>
                <HeroGrid heroes={filteredHeroes} onClick={this.props.onClick} showSelected={this.props.showSelected}/>
            </div>
        )
    }
}

export default FilterableHeroGrid;
