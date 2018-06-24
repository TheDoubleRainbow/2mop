import React from 'react';
import { Link } from 'react-router-dom'

const RegisterForm = ({register}) => {
	return (
					<div className = "login-form column is-4">
	      		<form onSubmit={register.bind(this)}>
	      			<div className="field">
							  <label className="label">Email</label>
							  <div className="control has-icons-left ">
							    <input className="input" type="email" placeholder="Email" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-envelope"></i>
							    </span>
							  </div>
							</div>
							<div className="field">
							  <label className="label">Password</label>
							  <div className="control has-icons-left">
							    <input className="input" type="password" placeholder="Password" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-key"></i>
							    </span>
							  </div>
							</div>
							<div className="field">
							  <label className="label">Confirm password</label>
							  <div className="control has-icons-left">
							    <input className="input" type="password" placeholder="Confirm password" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-key"></i>
							    </span>
							  </div>
							</div>
							<div className="loginButtonWrap">
								<button onClick={register.bind(this)} className="loginButton button is-dark">Register</button>
								<span className="or">OR</span>
								<Link to={`/login`} className='button loginButton is-dark is-outlined'>
		              <span>Login</span>
		           	</Link>
							</div>
	      		</form>
	      	</div>
		)
}

export default RegisterForm;