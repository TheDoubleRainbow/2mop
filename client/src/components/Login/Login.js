import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RecoverForm from './RecoverForm';

import './Login.css'

class Login extends Component {
	constructor(props){
		super(props)
		document.title = this.props.location.pathname === '/login' ? `${window.APP_NAME} | Login` : this.props.location.pathname === '/register' ? `${window.APP_NAME} | Registration` : `${window.APP_NAME} | Password recover`
		this.state = {
			tab: this.props.location.pathname === '/login' ? 1 : this.props.location.pathname === '/register' ? 2 : 3,
			location: this.props.location.pathname,
			userRegData: {
				type: 1,
				email: '',
				password: '',
				confirmPassword: '',
				fname: '',
				lname: '',
			},
			userLoginData: {
				email: '',
				password: '',
			},
			recover: '',
		}
	}
	login = (event) => {
		event.preventDefault();
		console.log('sending', this.state.userLoginData)
	}
	register = (event) => {
		event.preventDefault();
		alert('Registred!');
	}
	recover = (event) => {
		event.preventDefault();
		alert(this.state.recover)
	}
	changeType = (type) => {
		let userRegData = this.state.userRegData;
		userRegData.type = type;
		this.setState({userRegData: userRegData})
	}
	updateLogin = (event, type) => {
		let userLoginData = this.state.userLoginData;
		switch(type){
			case 'email':
				userLoginData.email = event.target.value;
				this.setState({userLoginData: userLoginData})
				break;
			case 'password':
				userLoginData.password = event.target.value;
				this.setState({userLoginData: userLoginData})
				break;
			default:
			 // nothing
		}
	}
	updateRecover = (event, type) => {
		this.setState({recover: event.target.value})
	}
  render() {
    return (
      <div className = "container loginPage">
      	<div className="columns is-multiline is-centered">
      		<div className="column is-12">
	      		{this.state.tab === 2 ? 
	      			<div>
		      			<div className="typeQuestion">Who are you?</div>
		      			<div className="buttons has-addons is-centered">
								  <span onClick={this.changeType.bind(this, 1)} className={`switchButton button ${this.state.userRegData.type === 1 ? 'is-link' : ''}`}>Student</span>
								  <span onClick={this.changeType.bind(this, 2)} className={`switchButton button ${this.state.userRegData.type === 2 ? 'is-link' : ''}`}>Company</span>
								</div>
							</div> : this.state.tab === 1 ? <div className="formHeader">Login</div> : <div className="formHeader">Password recovery</div>}
      		</div>
      		{this.state.tab === 1 ? <LoginForm login={this.login} upd={this.updateLogin} /> : this.state.tab === 2 ? <RegisterForm register={this.register} /> : <RecoverForm recover={this.recover} upd={this.updateRecover} />}
      		{ this.state.tab !== 3 ? <div className="column is-12 forgotButtonWrapper">
      			<Link to={`/recover`} className='forgotButton is-dark is-outlined'>
		              <span>Forgot your password?</span>
		      	</Link> 
      		</div>: ''}
      	</div> 
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
        if(prevProps === undefined) {
            return false
        }
        if (this.state.location !== this.props.location.pathname) {
        	 document.title = this.props.location.pathname === '/login' ? `${window.APP_NAME} | Login` : this.props.location.pathname === '/register' ? `${window.APP_NAME} | Registration` : `${window.APP_NAME} | Password recover`
           this.setState({tab: this.props.location.pathname === '/login' ? 1 : this.props.location.pathname === '/register' ? 2 : 3, location: this.props.location.pathname})
        }

    }
}

export default Login;
