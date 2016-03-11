"use strict";

var Utilities = require("./Utilities");

class Draft {
    constructor() {
        this.heroes = [];
        this.roles = [];
        this.pool = [];
        this.teamA = { heroes: [], roles: [] };
        this.teamB = { heroes: [], roles: [] };
    }

    init() {
        return Utilities
            .loadJson("heroes.json")
            .then((heroes) => {
                this.heroes = heroes;
                this.roles = heroes
                    .reduce((roles, hero) => roles.concat(hero.roles), [])
                    .filter((item, pos, self) => self.indexOf(item) === pos)
                    .sort();

                // Convert all matchup advantages to floats
                this.heroes.forEach((hero) => {
                    hero.matchups.forEach((matchup) => {
                        matchup.advantage = parseFloat(matchup.advantage);
                    })
                })
            })
            .then(() => { return Utilities.loadJson("pool.json"); })
            .then((heroes) => { this.pool = heroes; })
    }

    addHero(teamHero) {
        console.log(`Adding friendly hero '${teamHero.name}'`);
        this.teamA.heroes.push(this.heroes.find(hero => hero.name === teamHero.name));
    }

    addEnemy(enemyHero) {
        console.log(`Adding enemy hero '${enemyHero.name}'`);
        this.teamB.heroes.push(this.heroes.find(hero => hero.name === enemyHero.name))
    }

    _getTeamRoles(team) {
        team.roles = team.heroes
            .reduce((roles, hero) => roles.concat(hero.roles), [])
            .filter((role, n, roles) => roles.indexOf(role) === n)
            .sort();

        // Get missing roles
        team.missingRoles = this.roles.filter(role => team.roles.indexOf(role) === -1);
    }

    _getMeleeRangeCount(team) {
        team.numMelee = team.heroes.reduce((numMelee, hero) => (hero.atk === "melee") ? numMelee + 1 : numMelee, 0);
        team.numRanged = team.heroes.reduce((numRanged, hero) => (hero.atk === "ranged") ? numRanged + 1 : numRanged, 0);
    }

    _getBans(team) {
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
    }

    _getBansCombined(team) {
        team.bansCombined = team.heroes
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
                        alreadyBannedHero.advantage = alreadyBannedHero.advantage + banHero.advantage;
                    }
                });

                return bannedHeroes;
            }, [])
            .sort((a, b) => a.advantage - b.advantage);
    }

    _whoPlaysWho() {
        // TODO
    }

    run() {
        // Get team roles
        this._getTeamRoles(this.teamA);
        this._getTeamRoles(this.teamB);

        // Get the number of melee/ranged
        this._getMeleeRangeCount(this.teamA);
        this._getMeleeRangeCount(this.teamB);

        // Work out the bans list!
        this._getBans(this.teamA);
        this._getBansCombined(this.teamA);
        this._getBans(this.teamB);
        this._getBansCombined(this.teamB);

        this._whoPlaysWho(this.teamA);
    }
}

module.exports = Draft;
