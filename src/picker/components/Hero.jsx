import React from "react";


class Hero extends React.Component {
    getHeroImage(name) {
        let image = name.toLowerCase().replace(/([^a-z])/g, "_");

        if (image === "vengeful_spirit") {
            image = "vengefulspirit";
        }

        if (image === "windranger") {
            image = "windrunner";
        }

        if (image === "anti_mage") {
            image = "antimage";
        }

        if (image === "queen_of_pain") {
            image = "queenofpain";
        }

        return image;
    }

    render() {
        const name = this.props.hero.get("name");
        const image = this.getHeroImage(name);

        return (
            <div className="Hero">
                <img src={`http://cdn.dota2.com/apps/dota2/images/heroes/${image}_hphover.png`} alt={name}/>
            </div>
        )
    }
}

export default Hero;
