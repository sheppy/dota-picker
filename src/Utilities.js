"use strict";

var request = require("request-promise");
var Promise = require("bluebird");
var fs = require("fs");

var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);


class Utilities {
    static convertToJson(data) {
        return JSON.parse(data);
    }

    static loadJson(filename) {
        return readFile(filename, "utf8").then(Utilities.convertToJson);
    }

    static saveJson(filename, json) {
        return writeFile(filename, JSON.stringify(json, null, 4)).then(() => json);
    }

    static fetchJson(url) {
        return request(url).then(Utilities.convertToJson);
    }
}


module.exports = Utilities;
