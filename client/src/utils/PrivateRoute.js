import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './index';

const PrivateRoute = ({component: Component, ...rest}) => {

    if(!localStorage.getItem('token')){
        return <Redirect to='/login'/>
    }
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;