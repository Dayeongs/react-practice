import { LOGIN_USER } from '../_actions/types';
import { REGISTER_USER } from '../_actions/types';
import { AUTH_USER } from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return {...state, register: action.payload }   
        case AUTH_USER:
            return {...state, userData: action.payload }   
        default:
            return state;
    }
}