import {
    LOAD_ALL_RECIPES,
    LOAD_RECIPE,
    DELETE_RECIPE,
    EDIT_RECIPE,
    ADD_RECIPE,
    UPDATE_RECIPE,
    START,
    FINISH,
    SUCCESS,
    FAIL
} from '../constants'
import {propIs} from '../helpers'
export function loadAllRecipes() {
    return {
        type: LOAD_ALL_RECIPES
    }
}
export function deleteRecipe(id) {
    return {
        type: DELETE_RECIPE,
        payload: {id}
    }
}
export function editRecipe(id) {
    return {
        type: EDIT_RECIPE + START,
        payload: {id}
    }
}
export function updateRecipe(id, recipe) {
    return {
        type: UPDATE_RECIPE,
        payload: {id, recipe}
    }
}
export function editRecipeFinish(id) {
    return {
        type: EDIT_RECIPE + FINISH,
        payload: {id}
    }
}
export function addRecipe() {
    return {
        type: ADD_RECIPE + START
    }
}
export function addRecipeFinish(recipe, isGenerate) {
    return {
        type: ADD_RECIPE + FINISH,
        payload: {recipe},
        isGenerated: isGenerate
    }
}
export function checkAndAddRecipe(recipe) {
    const isGenerate = propIs(recipe);
    return (dispatch) => {
        if (isGenerate) {
            dispatch({
                type: ADD_RECIPE + SUCCESS,
                payload: {recipe},
                isGenerated: true
            })
        }
        else {
            dispatch({
                type: ADD_RECIPE + FAIL
            })
        }
    }
}