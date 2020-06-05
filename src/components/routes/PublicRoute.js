import React,{useContext} from 'react';

import {UserContext} from '../../context/UserContext'
 
import {Route, Redirect} from 'react-router-dom'

const PublicRoute = ({component: Component, ...rest}) => {
    const {authToken} = useContext(UserContext);
    return <Route {...rest} render={props => {
        return authToken ? <Redirect to="/dashboard"/> : <Component {...props}/>
    }}/>;
}
 
export default PublicRoute;