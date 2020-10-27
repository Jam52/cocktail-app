import { actionTypes } from '../actions/index';

const initialState = {
    drinks: []
}
export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_RANDOM_DRINKS:
            return {
                ...state,
                drinks: [...state.drinks, ...action.payload]
            }
        default:
            return state;
    }
}