import {types} from '../types';

const {CREATE_USER, AUTHORIZE_USER, SET_CURRENT_PAGE, SET_FLASH_MESSAGE, FETCH_USERS, LOGOUT_USER} = types;


const userReducer = (state, action) => {
    switch(action.type){

        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
            break;
        
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
            break;
        
        case AUTHORIZE_USER:
            return{
                ...state,
                userLoggedIn: action.payload.user,
                authToken: action.payload.authToken,
            }
            break;
        
        case LOGOUT_USER:
            return{
                ...state,
                userLoggedIn: {},
                authToken: '',
            }
            break;

        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
            break;
        
        case SET_FLASH_MESSAGE:
            return {
                ...state,
                flashMessage: {...state.flashMessage, type: action.payload.type, msg: action.payload.msg}
            }
        default:
            return state
    }
}

export default userReducer;