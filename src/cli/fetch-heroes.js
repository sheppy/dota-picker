"use strict";

var Utilities = require("./../Utilities");

var Promise = require("bluebird");
var Xray = require("x-ray");

var x = Xray()
    .throttle(1, "1s")
    .concurrency(3)
    .delay("0.25s");


function fetchHeroList() {
    return Utilities.fetchJson("http://www.dota2.com/jsfeed/heropickerdata")
        .then(heroes => Object.keys(heroes).map(heroKey => heroes[heroKey]));
}

function saveHeroesJson(heroes) {
    return Utilities.saveJson("lib/heroes.json", heroes);
}

function fetchMatchUpData(hero) {
    let id = hero.toLowerCase().replace(/\s+/g, "-").replace(/([^a-z-])/g, "");
    console.log(" - Fetching", id);


    return new Promise(function(resolve, reject) {
        try {
            x(`https://www.dotabuff.com/heroes/${id}/matchups`, {
                name: ".image-avatar@alt",
                winRate: ".header-content-secondary .won",
                popularity: ".header-content-secondary dl:nth-child(1) dd:nth-child(1)",
                matchups: x(".sortable tbody tr", [{
                    name: "td:nth-child(1)@data-value",
                    advantage: "td:nth-child(3)@data-value"
                }]),
                lanes: x(".col-8 > section:nth-of-type(1) tbody tr", [{
                    lane: "td:nth-child(1)",
                    presence: "td:nth-child(2)@data-value",
                    winRate: "td:nth-child(3)@data-value"
                }])
            })(function(err, obj) {
                if (err) return reject(err);
                console.log(" + Fetched", id);
                obj.id = id;
                obj.winRate = parseFloat(obj.winRate);
                obj.popularity = parseInt(obj.winRate, obj.popularity);
                resolve(obj);
            })
        }
        catch (err) {
            reject(err);
        }
    });
}

function fetchDotaBuffMatchups(heroes) {
    let promises = heroes.map(hero => fetchMatchUpData(hero.name));

    return Promise.mapSeries(promises, function(dotabuffHero) {
        // Merge the data back with heroes
        let hero = heroes.find(hero => hero.name == dotabuffHero.name);
        hero.matchups = dotabuffHero.matchups;
        hero.lanes = dotabuffHero.lanes;
        return hero;
    })
}


fetchHeroList()
//.then(heroes => heroes.slice(0, 4)) // Testing: Limit to 4 heroes
    .then(fetchDotaBuffMatchups)
    .then(saveHeroesJson)
    .then(function(heroes) {
        console.log("Done");
    });
