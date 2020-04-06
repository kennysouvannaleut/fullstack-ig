import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function ProtectedRoute(props){
    const {path, redirectTo, component: C, username, ...rest} = props

    return username ? 
        <Route path={path} render={() => <C {...rest}/>}/> :
        <Redirect to={redirectTo}/>
    
}

export default ProtectedRoute