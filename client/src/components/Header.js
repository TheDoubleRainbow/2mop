import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
	return (
		<nav className="navbar is-dark">
		  <div className="navbar-brand">
		  	<span className="navbar-item" href="/">
     			{window.APP_NAME}
    		</span>
		    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
		      <span></span>
		      <span></span>
		      <span></span>
		    </div>
		  </div>

		  <div className="navbar-menu">
		    <div className="navbar-start">
		      <Link to={`/`} className='navbar-item'>Home</Link>
		    </div>

		    <div className="navbar-end">
		      <div className="navbar-item">
		        <div className="field is-grouped">
		         
		          <p className="control">
		            <Link to={`/login`} className='button is-black'>
		            	
		              <span>Login</span>
		           	</Link>
		          </p>
		        </div>
		      </div>
		      <div className="navbar-item">
		        <div className="field is-grouped">
		         
		          <p className="control">
		            <Link to={`/register`} className='button is-black'>
		              <span>Register</span>
		           	</Link>
		          </p>
		        </div>
		      </div>
		    </div>
		  </div>
		</nav>
		)
}

export default Header;