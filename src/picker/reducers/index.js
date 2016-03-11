import { combineReducers } from "redux";

import players from "./players";
import heroes from "./heroes";
import pool from "./pool";

export default combineReducers({
    players,
    heroes,
    pool
});
