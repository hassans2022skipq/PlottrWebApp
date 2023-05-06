import { SET_USER } from '../actions/userActions';
export const userReducer = (state = null, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case 'CLEAR_USER':
            return null;
        default:
            return state;
    }
};