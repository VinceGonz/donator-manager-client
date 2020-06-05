import React,{createContext, useReducer, useEffect} from 'react';

import donationsReducer from '../reducers/donationsReducer'

import {types} from '../types'

export const DonationsContext = createContext({});



const DonationsContextProvider = ({children}) => {
    const initialState = {
        donatorsList: []
    }

    const {ADD_NEW_DONATOR, SET_DONATOR_LIST, DELETE_ONE_DONATOR, UPDATE_DONATOR} = types;

    const [state, dispatch] = useReducer(donationsReducer,initialState, () => {
        const localDataStorage = {
            donatorsList: localStorage.getItem('donatorsList'),
        }

        return localDataStorage.donatorsList ? {...initialState, donatorsList: JSON.parse(localDataStorage.donatorsList) || []} : initialState
    });
    
    const {donatorsList} = state;

    useEffect(() => {
        localStorage.setItem('donatorsList', JSON.stringify(donatorsList))
    },[donatorsList])

    const getAllDonators = async() => {
        const response = await fetch('https://donator-manager.herokuapp.com/api/donations', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const result = await response.json();
        console.log(result.donatorsList);
        dispatch({type: SET_DONATOR_LIST, payload: result.donatorsList});
        return result.donatorsList;
    }

    const addNewDonator = async donator => {
        dispatch({type: ADD_NEW_DONATOR, payload: donator})
        const response = await fetch('https://donator-manager.herokuapp.com/api/donations/addDonator', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(donator)
        })

        const result = await response.json();
        console.log(result.rows)
        
    }

    const removeOneDonator = async (donation_id, user) => {
        dispatch({type: DELETE_ONE_DONATOR, payload: donation_id});
        console.log(user)
        const response  = await fetch(`https://donator-manager.herokuapp.com/api/donations/deleteDonator/${donation_id}`,{
            method: `DELETE`,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        const result = await response.json();
        console.log(result);
    } 



    const setDonatorList = async donators => {
        dispatch({type: SET_DONATOR_LIST, payload: donators})
    }

    const updateDonator = async donator => {
        dispatch({type: UPDATE_DONATOR, payload: donator})
        const response = await fetch('https://donator-manager.herokuapp.com/api/donations/updateDonator', {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(donator)
        });

        const result = await response.json();
        console.log(result);
    }

    return (
        <DonationsContext.Provider value={{donatorsList, addNewDonator, setDonatorList, getAllDonators, removeOneDonator, updateDonator}}>
            {children}
        </DonationsContext.Provider>
    )
}


export default DonationsContextProvider;