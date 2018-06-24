import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './Login/Login'
 
const Router = () => {
	return (
			<main>
			    <Switch>
			      <Route exact path='/login' component={Login}/>
			      <Route exact path='/register' component={Login}/>
			      <Route exact path='/recover' component={Login}/>
			    </Switch>
		  	</main>
		)
}

export default Router;
