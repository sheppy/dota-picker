import React from "react";


class SearchBar extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        filterText: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <input type="search" defaultValue={this.props.filterText} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default SearchBar;
