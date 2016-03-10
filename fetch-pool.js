"use strict";

var Utilities = require("./src/Utilities");

var Promise = require("bluebird");
var Xray = require("x-ray");


var x = Xray()
    .throttle(1, "1s")
    .concurrency(3)
    .delay("0.25s");


function fetchHeroPool() {
    return Utilities.loadJson("_pool.json");
}

function saveHeroesJson(heroes) {
    return Utilities.saveJson("pool.json", heroes);
}

function fetchPlayers(heroPool) {
    return Utilities.loadJson("_players.json")
        .then(function(players) {
            // Merge in the player in to each entry in the pool
            return Promise.each(heroPool, hero => hero.players = JSON.parse(JSON.stringify(players)))
        });
}

function fetchPlayerMatchData(player, hero) {
    let id = hero.toLowerCase().replace(/\s+/g, "-").replace(/([^a-z-])/g, "");
    console.log(" - Fetching", player, id);

    return new Promise(function(resolve, reject) {
        try {
            x(`https://www.dotabuff.com/players/${player}/matches?hero=${id}`, {
                winRate: ".color-stat-win",
                matches: ".r-stats-grid .group:nth-child(2) .kv:nth-child(1)",
                avgDuration: ".r-stats-grid .group:nth-child(1) .kv:nth-child(3)"
            })(function(err, obj) {
                if (err) return reject(err);
                console.log(" + Fetched", player, id);
                obj.name = hero;
                obj.winRate = parseFloat(obj.winRate);
                obj.matches = parseInt(obj.matches, 10);
                obj.avgDuration = (obj.avgDuration || "00:00").replace(/([^0-9:]+)/, "");
                resolve(obj);
            });
        } catch (err) {
            reject(err);
        }
    });
}

function fetchDotaBuffPlayerMatches(heroPool) {
    return Promise.each(heroPool, function(hero) {
        return Promise.each(hero.players, function(player) {
            return fetchPlayerMatchData(player.dotabuffId, hero.name)
                .then(function(dotaBuffPlayer) {
                    player.stats = dotaBuffPlayer;
                });
        });
    });
}


fetchHeroPool()
    .then(fetchPlayers)
    .then(fetchDotaBuffPlayerMatches)
    .then(saveHeroesJson)
    .then(function(heroes) {
        console.log("Done");
    });
