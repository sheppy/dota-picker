import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";


class Hero extends React.Component {
    static propTypes = {
        hero: ImmutablePropTypes.map.isRequired,
        onClick: React.PropTypes.func,
        showSelected: React.PropTypes.bool
    };

    shouldComponentUpdate(nextProps) {
        return this.props.hero !== nextProps.hero;
    }

    getHeroImage(name) {
        let image = name.toLowerCase().replace(/([^a-z])/g, "_");

        switch (image) {
            case "vengeful_spirit": return "vengefulspirit";
            case "windranger": return "windrunner";
            case "anti_mage": return "antimage";
            case "queen_of_pain": return "queenofpain";
            case "shadow_fiend": return "nevermore";
            case "outworld_devourer": return "obsidian_destroyer";
            case "zeus": return "zuus";
            case "necrophos": return "necrolyte";
            case "wraith_king": return "skeleton_king";
            case "clockwerk": return "rattletrap";
            case "nature_s_prophet": return "furion";
            case "lifestealer": return "life_stealer";
            case "doom": return "doom_bringer";
            case "treant_protector": return "treant";
            case "io": return "wisp";
            case "centaur_warrunner": return "centaur";
            case "timbersaw": return "shredder";
            case "magnus": return "magnataur";

            default: return image;
        }

    }

    render() {
        const name = this.props.hero.get("name");
        // const image = `http://cdn.dota2.com/apps/dota2/images/heroes/${this.getHeroImage(name)}_hphover.png`;
        const image = `http://cdn.dota2.com/apps/dota2/images/heroes/${this.getHeroImage(name)}_sb.png`;

        const heroClass = classNames({
            Hero: true,
            "is-selected": this.props.showSelected && this.props.hero.get("selected")
        });

        const onClick = this.props.onClick ? this.props.onClick.bind(null, this.props.hero) : null;

        return (
            <div className={heroClass}>
                <img src={image} alt={name} title={name} onClick={onClick}/>
            </div>
        )
    }
}

export default Hero;
