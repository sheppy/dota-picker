"use strict";

var Draft = require("./src/Draft");


var draft = new Draft();

draft.init().then(function() {
    draft.addHero({ name: "Juggernaut" });
    draft.addHero({ name: "Razor" });
    draft.addHero({ name: "Tidehunter" });
    draft.addHero({ name: "Undying" });
    draft.addHero({ name: "Earthshaker" });
    draft.run();


    console.log("----");
    console.log("Team Roles:", draft.teamA.roles);
    console.log("Missing Roles:", draft.teamA.missingRoles);
    console.log("Melee Heroes:", draft.teamA.numMelee);
    console.log("Ranged Heroes:", draft.teamA.numRanged);


    console.log("----");
    console.log("Bans:");
    draft.teamA.bans.slice(0, 20).forEach((ban) => {
        console.log(`  '${ban.name}'\t\t@ ${ban.advantage}`)
    });

    console.log("----");
    console.log("Combined Bans:");
    draft.teamA.bansCombined.slice(0, 20).forEach((ban) => {
        console.log(`  '${ban.name}'\t\t@ ${ban.advantage}`)
    });

    // TODO: Assign pick order?
    // TODO: Assign heroes to players!?
});
