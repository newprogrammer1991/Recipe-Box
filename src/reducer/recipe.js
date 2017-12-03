import {
    LOAD_ALL_RECIPES,
    ADD_RECIPE,
    LOAD_RECIPE,
    DELETE_RECIPE,
    EDIT_RECIPE,
    START,
    FINISH,
    SUCCESS,
    FAIL,
    UPDATE_RECIPE
} from '../constants'
import {recipes} from '../../fixtures'
import {arrToMap} from '../helpers'

const defaultState = {
    isEdit: false,
    entities: arrToMap(recipes)
}
export default (state = defaultState, action) => {
    const {payload, type, randomId} = action;
    switch (type) {
        case LOAD_ALL_RECIPES:
            return {...state};
        case DELETE_RECIPE:
            let tmp = {...state.entities};
            delete tmp[payload.id];
            return {...state, entities: tmp};
        case EDIT_RECIPE + START:
            const id = payload.id;
            const tmp2 = {...state['entities'], [id]: {...state['entities'][id], 'isEdit': true}}
            return {...state, isEdit: true, entities: tmp2};
        case UPDATE_RECIPE:
            const tmp3 = {
                ...state['entities'],
                [payload.id]: {
                    ...state['entities'][payload.id],
                    'title': payload.recipe.title,
                    'ingredients': payload.recipe.ingredients
                }
            }
            return {...state, 'entities': tmp3}
        case EDIT_RECIPE + FINISH:
            const tmp4 = {...state['entities'], [payload.id]: {...state['entities'][payload.id], 'isEdit': false}}
            return {...state, 'isEdit': false, entities: tmp4}

        case ADD_RECIPE + START:
            return {...state, isEdit: true};
        case ADD_RECIPE + SUCCESS:
            const map = {...payload.recipe, id: String(randomId)};
            const tmp5 = {...state['entities'], [randomId]: map}
            return {...state, isEdit: false, entities: tmp5}
        case ADD_RECIPE + FAIL:
            return {...state, isEdit: false}
        default:
            return state;
    }
}