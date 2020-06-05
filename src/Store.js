import React from 'react';

import UserContextProvider from './context/UserContext';
import DonationsContextProvider from './context/DonationsContext';
import ExpensesContextProvider from './context/ExpensesContext'


const Store = ({children}) => {
    return <ExpensesContextProvider>
        <DonationsContextProvider>
        <UserContextProvider>
            {children}
        </UserContextProvider>
        </DonationsContextProvider>
    </ExpensesContextProvider>
}
 
export default Store;


