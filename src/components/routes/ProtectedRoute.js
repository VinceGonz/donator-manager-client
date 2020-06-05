import React, { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from '../../context/UserContext';



const ProtectedRoute = ({component: Component, ...rest}) => {
    const {authToken} = useContext(UserContext);
    return <Route {...rest} render={props => (
        authToken ? <Component {...props}/> : <Redirect to='/' />
    )}/>
}
 
export default ProtectedRoute;


