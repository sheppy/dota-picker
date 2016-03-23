import T from "../constants/ACTION_TYPES";


export function selectHero(hero) {
    return { type: T.DRAFT.SELECT_HERO, hero };
}


export function unSelectHero(hero) {
    return { type: T.DRAFT.UNSELECT_HERO, hero };
}
