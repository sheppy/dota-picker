import { Map, List, fromJS } from "immutable";
import T from "../constants/ACTION_TYPES";

const INITIAL_STATE = Map({
    heroes: List(),
    picks: List(),
    bans: List(),
    suggestedBans: List()
});

/*
        team.bans = team.heroes.slice(0)
            .reduce((bannedHeroes, teamHero) => {
                // Get the bans for this hero
                let badForThisHero = teamHero.matchups
                    .filter(matchup => matchup.advantage < 0)
                    .filter(hero => !team.heroes.find(teamHero => hero.name === teamHero.name));

                badForThisHero.forEach(function(banHero) {
                    let alreadyBannedHero = bannedHeroes.find(hero => hero.name === banHero.name);
                    if (!alreadyBannedHero) {
                        bannedHeroes.push(Object.assign({}, banHero));
                    } else {
                        // Update it possibly!
                        if (banHero.advantage > alreadyBannedHero.advantage) {
                            alreadyBannedHero.advantage = banHero.advantage;
                        }
                    }
                });

                return bannedHeroes;
            }, [])
            .sort((a, b) => a.advantage - b.advantage);
*/

function calculateBans(state) {
    return state.get("picks").reduce((bannedHeroes, pickedHero) => {
        // Get the bans for this hero
        let bansForThisHero = pickedHero.get("matchups")
            .filter(matchup => parseFloat(matchup.get("advantage")) < 0)
            .filter(matchup => state.get("heroes").find(teamHero => matchup.get("name") === teamHero.get("name")));

        bansForThisHero.forEach(function(banHero) {
            let alreadyBannedHeroIndex = bannedHeroes.findIndex(hero => hero.get("name") === banHero.get("name"));
            if (alreadyBannedHeroIndex === -1) {
                bannedHeroes = bannedHeroes.push(banHero)
            } else {
                bannedHeroes = bannedHeroes.updateIn([alreadyBannedHeroIndex, "advantage"], function(advantage) {
                    if (parseFloat(banHero.advantage) > parseFloat(advantage)) {
                        return parseFloat(banHero.advantage);
                    }

                    return advantage;
                })
            }
        });

        return bannedHeroes
    }, List()).sort((a, b) => parseFloat(a.get("advantage")) - parseFloat(b.get("advantage")));
}

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case T.API.HEROES_SUCCESS:
            return state.set("heroes", fromJS(action.response));

        case T.DRAFT.SELECT_HERO:
            state =  state.updateIn(["picks"], (picks) => picks.push(action.hero));
            return state.merge({ suggestedBans: calculateBans(state) });

        case T.DRAFT.UNSELECT_HERO:
            return state.updateIn(["picks"], function(picks) {
                let index = picks.findIndex(hero => hero.get("name") === action.hero.get("name"));
                return picks.remove(index);
            });

        default:
            return state;
    }
};
