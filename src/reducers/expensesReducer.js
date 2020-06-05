import {types} from '../types';


const expensesReducer = (state, action) => {
    const {FETCH_EXPENSES} = types;
    switch(action.type){
        case FETCH_EXPENSES:
            return {
                ...state,
                expensesList: action.payload
            }
            break;
        
        default:
            return state
    }
}


export default expensesReducer;
