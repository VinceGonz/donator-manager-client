
import {types} from '../types';

const {ADD_NEW_DONATOR, SET_DONATOR_LIST, DELETE_ONE_DONATOR, UPDATE_DONATOR} = types;

const donationsReducer = (state,action) => {
    switch(action.type){
        case ADD_NEW_DONATOR:
            return {
                ...state,
                donatorsList: [...state.donatorsList, action.payload]
            }
            break;
        
        case SET_DONATOR_LIST:
            return {
                ...state,
                donatorsList: action.payload
            }
            break;
        
        case DELETE_ONE_DONATOR:
            return {
                ...state,
                donatorsList: state.donatorsList.filter(donator => donator.donation_id !== action.payload)
            }
            break;

        case UPDATE_DONATOR:
            return {
                ...state,
                donatorsList: state.donatorsList.map(donator => {
                    if(donator.donation_id === action.payload.donation_id){
                        donator = action.payload
                    }
                    return donator

                })
            }
            break;

        default:
            return state
    }
}



export default donationsReducer;