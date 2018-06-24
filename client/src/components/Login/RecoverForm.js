import React from 'react';
// import { Link } from 'react-router-dom'

const RecoverForm = ({recover, upd}) => {
	return (
					<div className = "login-form column is-4">
	      		<form onSubmit={recover.bind(this)}>
	      			<div className="field">
							  <label className="label">Email</label>
							  <div className="control has-icons-left ">
							    <input onChange={(e) => {upd(e, 'email')}} className="input" type="email" placeholder="Email input" />
							    <span className="icon is-small is-left">
							      <i className="fas fa-envelope"></i>
							    </span>
							  </div>
							</div>
							<div className="loginButtonWrap">
								<button onClick={recover.bind(this)} className="recoverButton button is-dark">Recover my password</button>
							</div>
	      		</form>
	      	</div>
		)
}

export default RecoverForm;