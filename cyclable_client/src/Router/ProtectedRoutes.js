import React from "react";
import {Route, Redirect} from "react-router-dom";
import Authentication from "../Authentication/Authentication";

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => {
            if(Authentication.isAuthenticated()) {
                return <Component {...props} />;
            } else {
                return (<Redirect to={
                    {
                        pathname : "/register",
                        state: {
                            from: props.location
                        }
                    }
                }
                />);
            }
            
        }} />
    )
}

export default ProtectedRoute;