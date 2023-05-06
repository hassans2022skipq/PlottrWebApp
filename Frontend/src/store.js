import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { SET_USER, REMOVE_USER } from './actions/userActions';


const initialState = {
    user: null,
    stories: []
};

export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case REMOVE_USER:
            return null;
        default:
            return state;
    }
};

export const storyReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STORY':
            return [...state, action.payload];
        case 'REMOVE_STORY':
            return state.filter(story => story.id !== action.payload.id);
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    user: userReducer,
    stories: storyReducer
});


const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;