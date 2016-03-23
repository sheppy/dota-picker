import { List, fromJS } from "immutable";
import T from "../constants/ACTION_TYPES";

const INITIAL_STATE = List();

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case T.API.HEROES_SUCCESS:
            return fromJS(action.response);

        case T.DRAFT.SELECT_HERO:
            let selectedIndex = state.findIndex(hero => hero.get("name") === action.hero.get("name"));
            return state.update(selectedIndex, hero => hero.set("selected", true));

        case T.DRAFT.UNSELECT_HERO:
            let unselectedIndex = state.findIndex(hero => hero.get("name") === action.hero.get("name"));
            return state.update(unselectedIndex, hero => hero.set("selected", false));

        default:
            return state;
    }
};
