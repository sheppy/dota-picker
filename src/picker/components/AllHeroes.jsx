import React from "react";

import Hero from "./Hero.jsx";

class AllHeroes extends React.Component {
    render() {
        return (
            <div className="AllHeroes">
                Total Heroes: {this.props.heroes.size}

                <ul>
                    {this.props.heroes.map((hero, n) =>
                        <li key={n}>
                            <Hero hero={hero}/>
                        </li>
                    )}
                </ul>

            </div>
        )
    }
}

export default AllHeroes;
