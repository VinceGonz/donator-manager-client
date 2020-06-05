import React, {createContext, useReducer, useEffect} from 'react';

import userReducer from '../reducers/userReducer';

import {types} from '../types';

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {

    const {CREATE_USER,AUTHORIZE_USER, SET_CURRENT_PAGE, SET_FLASH_MESSAGE, FETCH_USERS, LOGOUT_USER} = types;

    const initialState = {
        users: [],
        authToken: '',
        userLoggedIn: {},
        flashMessage: {type: '', msg: ''},
        currentPage: "loginPage"
    }

    /* 
        const localDataStorage = {
            currentPage: localStorage.getItem('currentPage'),
            userLoggedIn: localStorage.getItem('userLoggedIn')
        }
    */
    const [state, dispatch] = useReducer(userReducer,initialState, () => {
        const localDataStorage = {
            currentPage: localStorage.getItem('currentPage'),
            userLoggedIn: localStorage.getItem('userLoggedIn'),
            authToken: localStorage.getItem('authToken'),
        }

        // const {currentPage, userLoggedIn} = localDataStorage;
        // const localData = localStorage.getItem('currentPage');
        return localDataStorage ? {...initialState, currentPage: JSON.parse(localDataStorage.currentPage), userLoggedIn: JSON.parse(localDataStorage.userLoggedIn), authToken: JSON.parse(localDataStorage.authToken)} : initialState
    });

    const {users, authToken, userLoggedIn, currentPage, flashMessage} = state;



    useEffect(() => {
        localStorage.setItem('authToken', JSON.stringify(authToken))
    },[authToken])

    useEffect(() => {
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        setFlashMessage({type: "", msg: ""})

        // eslint-disable-next-line
    }, [currentPage])

    useEffect(() => {
        localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn))
    },[userLoggedIn])

    const getUsers = async () => {
        const response = await fetch('https://donator-manager.herokuapp.com/api/users', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });

        const result = await response.json();
        console.log(result)
        dispatch({type: FETCH_USERS, payload: result.Users})
    }


    const createUser = async (newUser) => {
        const response = await fetch(`https://donator-manager.herokuapp.com/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        const result = await response.json();
        console.log(result)
        dispatch({type: CREATE_USER, payload: {name:'jim'}});
    }

    const authorizeUser = async (userData) => {

        // https://donator-manager.herokuapp.com
        const response = await fetch('https://donator-manager.herokuapp.com/api/auth/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            });
        // const result = await response.json();
        const {user, token, successCode} = await response.json();

        if(token && user.is_active){
            console.log(user);
            dispatch({type: AUTHORIZE_USER, payload: {user, authToken: token}})
            return user.is_active;
        }
        
    }

    const logoutUser = () => {
        dispatch({type: LOGOUT_USER, payload: {}})
    }

    const setCurrentPage = (page) => {
        dispatch({type: SET_CURRENT_PAGE, payload: page});
    }

    const setFlashMessage = msgObj => {
        dispatch({type: SET_FLASH_MESSAGE, payload: msgObj});
    }

    
    
    return (
        <UserContext.Provider value={{users, authToken, userLoggedIn, createUser, authorizeUser, currentPage, setCurrentPage, flashMessage, setFlashMessage, getUsers, logoutUser}}>
            {children}
        </UserContext.Provider>
    )


}

export default UserContextProvider;

