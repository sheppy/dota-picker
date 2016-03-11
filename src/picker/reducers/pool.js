import { List, fromJS } from "immutable";
import T from "../constants/ACTION_TYPES";

const INITIAL_STATE = List();

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case T.API.POOL_SUCCESS:
            return fromJS(action.response);
        break;

        default:
            return state;
    }
};
