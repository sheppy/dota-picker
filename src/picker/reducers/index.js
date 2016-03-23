import { combineReducers } from "redux";

import players from "./players";
import heroes from "./heroes";
import pool from "./pool";
import picked from "./picked";
import suggestions from "./suggestions";


export default combineReducers({
    players,
    heroes,
    pool,
    picked,
    suggestions
});
