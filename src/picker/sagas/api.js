import { takeLatest } from "redux-saga";
import { call, put } from "redux-saga/effects";
import T from "../constants/ACTION_TYPES";
import * as API from "../services/api";


function *requestData() {
    try {
        const results = yield [
            call(API.request, "players.json"),
            call(API.request, "heroes.json"),
            call(API.request, "pool.json")
        ];

        yield [
            put({ type: T.API.PLAYERS_SUCCESS, response: results[0], receivedAt: Date.now() }),
            put({ type: T.API.HEROES_SUCCESS, response: results[1], receivedAt: Date.now() }),
            put({ type: T.API.POOL_SUCCESS, response: results[2], receivedAt: Date.now() })
        ];
    }
    catch (e) {
        yield put({ type: T.API.DATA_FAILED, message: e.message });
    }

}

export function *watchRequestData() {
    yield* takeLatest(T.API.DATA_REQUEST, requestData);
}
