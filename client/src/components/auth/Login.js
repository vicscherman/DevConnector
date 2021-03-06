import React, { Fragment, useState } from 'react';
import { Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleDemoAccount = () => {
    setFormData({
      email: process.env.REACT_APP_DEMO_EMAIL,
      password: process.env.REACT_APP_DEMO_PASSWORD
    });
  };

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //ultimately will be redux action. Just to test let's do the following
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };
  //Redirect if logged in

  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign in here
      </p>
      <form className='form' onSubmit={(e) => handleFormSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => handleInputChange(e)}
            required
            minLength='6'
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
        <button type='submit' onClick={handleDemoAccount} className='btn btn-danger'>Use Demo Account</button>
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
