import { List, fromJS } from "immutable";
import T from "../constants/ACTION_TYPES";

const INITIAL_STATE = List();

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case T.DRAFT.SELECT_HERO:
            return state.push(action.hero);

        case T.DRAFT.UNSELECT_HERO:
            let index = state.findIndex(hero => hero.get("name") === action.hero.get("name"));
            return state.remove(index);

        default:
            return state;
    }
};
