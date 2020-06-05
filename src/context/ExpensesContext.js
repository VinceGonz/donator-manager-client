import React,{useReducer, createContext} from 'react';

import {types} from '../types'

import expensesReducer from '../reducers/expensesReducer';




export const ExpensesContext = createContext({});



const ExpensesContextProvider = ({children}) => {

    const {FETCH_EXPENSES} = types;

    const initialState = {
        expensesList: []
    }

    const [state, dispatch] = useReducer(expensesReducer, initialState);

    const {expensesList} = state;


    // https://donator-manager.herokuapp.com
    const getExpenses = async () => {
        const response = await fetch('https://donator-manager.herokuapp.com/api/expenses', {
            method: "GET",
            headers:{'Content-Type': 'application/json'}
        });

        const result = await response.json();
        console.log(result.Expenses);
        dispatch({type: FETCH_EXPENSES, payload: result.Expenses})
    }


    return <ExpensesContext.Provider value={{expensesList, getExpenses}}>
        {children}
    </ExpensesContext.Provider>
}
 
export default ExpensesContextProvider;