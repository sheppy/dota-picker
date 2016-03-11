"use strict";

var munkres = require("munkres-js");
var Utilities = require("./src/Utilities");


var heroList, playerList;

//var heroesToPlay = ["Sven", "Sniper", "Slardar", "Witch Doctor", "Dazzle"];
var heroesToPlay = ["Anti-Mage", "Windranger", "Undying", "Ogre Magi", "Lion"];

var heroMatrix, playerMatrix, costMatrix;

Utilities.loadJson("pool.json")
    .then((heroes) => {
        heroList = heroes;
        return heroes.filter((hero) => heroesToPlay.indexOf(hero.name) !== -1)
    })
    .then((heroes) => {
        heroMatrix = heroes.map((hero) => hero.name);
        playerMatrix = heroes[0].players.map((player) => player.name);
        costMatrix = [];
    })
    .then(() => Utilities.loadJson("players.json"))
    .then((players) => {
        playerList = players;
    })
    .then(() => {
        heroMatrix.forEach(function(heroName) {
            let hero = heroList.find((hero) => hero.name === heroName);
            let row = [];

            playerMatrix.forEach(function(playerName) {
                let player = hero.players.find((player) => player.name === playerName);
                let cost = player.stats.winRate;

                // Attempt to normalize based on a minimum of 10 matches
                let percent = (Math.min(10, player.stats.matches) / 10) / 100;
                cost *= percent;

                // Validate if this player can play the hero
                let canPlay = playerList.find((player) => player.name === playerName).canPlay.indexOf(heroName) !== -1;

                if (!canPlay) {
                    console.warn(`  ! ${playerName} cannot play ${heroName}`);
                    cost = 0;//cost / 1000;
                }

                console.info(`  * ${playerName} : ${heroName} = ${cost}   {${percent} - ${100-player.stats.winRate}}`);
                row.push(100 - cost);   // Inverse cost
            });

            costMatrix.push(row);
        });

        //console.log(heroMatrix);
        //console.log(playerMatrix);
        //console.log(costMatrix);

        let m = new munkres.Munkres();
        let indices = m.compute(costMatrix);

        for (let i = 0; i < indices.length; ++i) {
            let row = indices[i][0], col = indices[i][1];
            var value = costMatrix[row][col];
            console.log(`> ${heroMatrix[row]} < ${playerMatrix[col]} (${value})`);
        }
    });










/*

// Juggernaught	J	Razor	G	Tidehunter	B	Undying	S	Earthshaker O

var heroes = ["Juggernaught", "Razor", "Tidehunter", "Undying", "Earthshaker"];
var players = ["Sheppy", "Jeeves", "Oli", "Gaz", "Bangz"];



var matrix = [
    [100 - 0,       100 - 0,    100 - 0,    100 - 0,        100 - 0],       // Juggernaught
    [100 - 75,      100 - 33,   100 - 0,    100 - 60.87,    100 - 71.43],   // Razor
    [100 - 60,      100 - 50,   100 - 0,    100 - 25,       100 - 69.7],    // Tidehunter
    [100 - 66.67,   100 - 25,   100 - 0,    100 - 50,       100 - 60.56],   // Undying
    [100 - 50,      100 - 0,    100 - 40,   100 - 64.29,    100 - 66.67]    // Earthshaker
];


var matrix = [
    [100 - 0, 100 - 75, 100 - 60, 100 - 66.67, 100 - 50],  // Sheppy
    [100 - 0, 100 - 33, 100 - 50, 100 - 25, 100 - 0],  // Jeeves
    [100 - 0, 100 - 0, 100 - 0, 100 - 0, 100 - 40],  // Oli
    [100 - 0, 100 - 60.87, 100 - 25, 100 - 50, 100 - 64.29],  // Gaz
    [100 - 0, 100 - 71.43, 100 - 69.7, 100 - 60.56, 100 - 66.67]   // Bangz
];

var m = new munkres.Munkres();
console.log(munkres.format_matrix(matrix));

var indices = m.compute(matrix);

var total = 0;
for (var i = 0; i < indices.length; ++i) {
    var row = indices[i][0],
        col = indices[i][1];
    var value = matrix[row][col];
    //console.log('(' + row + ', ' + col + ') -> ' + value);

    console.log('>', heroes[row], players[col]);
}
console.log('total cost:', total);


// Rows == Jobs     (heroes)
// Cols == Workers  (players)

// Rows represent objects to be assigned, columns represent assignments to be filled


class HungarianAlgorithm {
    constructor(rows, cols) {
        this.rows = cols;
        this.cols = cols;
    }


    // Step 0:  Create an nxm  matrix called the cost matrix in which each element represents the cost of assigning
    //          one of n workers to one of m jobs. Rotate the matrix so that there are at least as many columns as
    //          rows and let k=min(n,m).
    step0() {
        this.costMatrix = [];
    }
}

var heroes = ["Hero1", "hero2", "hero3"];
var players = [
    {
        name: "player1",
        heroes: []
    }
];
*/
//new HungarianAlgorithm([]);

/*
class HungarianAlgorithm {

    constructor(heroes, players) {
        this._init(heroes, players);
    }

    _init(heroes, players) {
        this.rows = heroes.length;
        this.cols = players.length;
        this.dim = Math.max(this.rows, this.cols);
        this.solutions = this.dim;

        this.skillMatrix = this._initMatrix(this.rows, this.cols);
        this.matrix = this._initMatrix(this.dim, this.dim);
        //this.stars = this._initMatrix(this.dim, this.dim);
        this.matrix = this._loadMatrix(heroes, players, this.matrix, true);
        this.skillMatrix = this._loadMatrix(heroes, players, this.skillMatrix, false);

        this.rCov = new Array(this.dim).fill(0);
        this.cCov = new Array(this.dim).fill(0);
    }

    _initMatrix(sizeX, sizeY) {
        var matrix = new Array(sizeX);
        for (var i = 0; i < sizeX; i++) {
            matrix[i] = new Array(sizeY).fill(0);
        }
        return matrix;
    }

    //_loadMatrix(heroes, players, matrix, reverse) {
    //    matrix = loadYourMatrix(heroes, players, matrix); // I've removed my implementation here. Far too much stuff
    //    if (reverse) {
    //        // This reverses the matrix.  We need to to create a cost based solution.
    //        matrix = HG.reverseMatrix(HG.findMaxValue(matrix), matrix);
    //    }
    //    return matrix;
    //}

}
*/



// https://github.com/KevinStern/software-and-algorithms/blob/master/src/main/java/blogspot/software_and_algorithms/stern_library/optimization/HungarianAlgorithm.java
class HungarianAlgorithm2 {
    /**
     *
     * @param costMatrix
     *          the cost matrix, where matrix[i][j] holds the cost of assigning
     *          worker i to job j, for all i, j. The cost matrix must not be
     *          irregular in the sense that all rows must be the same length.
     */
    constructor(costMatrix) {
        this.rows = costMatrix.length;
        this.cols = costMatrix[0].length;
        this.dim = Math.max(this.rows, this.cols);

        this.costMatrix = [];

        for (var y = 0; y < this.cols; y++) {
            this.costMatrix[y] = [];
            for (var x = 0; x < this.rows; x++) {
                this.costMatrix[y][x] = costMatrix[y][x];
            }
        }

        //for (var w = 0; w < this.dim; w++) {
        //    if (w < costMatrix.length) {
        //
        //    } else {
        //        this.costMatrix[w] = [];
        //    }
        //}
    }

    /**
     * Execute the algorithm.
     */
    execute() {

    }
}
