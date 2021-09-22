import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {privateRoutes,publicRoutes} from '../router';
import {useTypedSelector} from '../hooks/useTypedSelector';



const AppRouter = ()=>{
    const {auth}  = useTypedSelector(state=>state.authReducer)
return(
    auth?//<Redirect to={"/"}/>
    <>
    <Switch>
        {
          privateRoutes.map(route=><Route path={route.path} 
            exact={route.exact} 
            component={route.component}
            key={route.path}
            />)
        }
    </Switch>
    <Redirect to={"/"}/>
    </>
    :
    <>
    <Switch>
        {
          publicRoutes.map(route=><Route path={route.path} 
            exact={route.exact} 
            component={route.component} 
            key={route.path}/>)
        }
    <Redirect to={"/login"}/>
    </Switch>
    </>
)
}
export default AppRouter