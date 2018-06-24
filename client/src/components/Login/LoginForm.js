import React from 'react';
import { Link } from 'react-router-dom'

const LoginForm = ({login, upd}) => {
	return (
					<div className = "login-form column is-4">
	      		<form onSubmit={login.bind(this)}>
	      			<div className="field">
							  <label className="label">Email</label>
							  <div className="control has-icons-left ">
							    <input onChange={(e) => {upd(e, 'email')}} className="input" type="email" placeholder="Email input" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-envelope"></i>
							    </span>
							  </div>
							</div>
							<div className="field">
							  <label className="label">Password</label>
							  <div className="control has-icons-left">
							    <input onChange={(e) => {upd(e, 'password')}} className="input" type="password" placeholder="Password input" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-key"></i>
							    </span>
							  </div>
							</div>
							<div className="loginButtonWrap">
								<button onClick={login.bind(this)} className="loginButton button is-dark">Login</button>
								<span className="or">OR</span>
								<Link to={`/register`} className='button loginButton is-dark is-outlined'>
		              <span>Register</span>
		           	</Link>
							</div>
	      		</form>
	      	</div>
		)
}

export default LoginForm;