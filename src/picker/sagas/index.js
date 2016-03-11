import * as apiSagas from "./api";


function concatSagas(sagas, newSagas) {
    for (let saga in newSagas) {
        if (newSagas.hasOwnProperty(saga)) {
            sagas.push(newSagas[saga]);
        }
    }
}


const sagas = [];

concatSagas(sagas, apiSagas);

export default sagas;
