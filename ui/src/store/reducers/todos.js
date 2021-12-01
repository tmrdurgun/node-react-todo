import * as constants from '../constants';

const INITIAL_STATE = {
    data: [],
}

const todosReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case constants.SET_TODOS: {
            return{
                ...state,
                data: action.data
            }
        }

        default: {
            return state;
        }
    }
}

export default todosReducer;