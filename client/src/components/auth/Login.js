import React ,{Fragment, useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
  
  });

  const { email, password} = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//ultimately will be redux action. Just to test let's do the following
  const handleFormSubmit = async(e) => {
    e.preventDefault();
  
      console.log('Success', formData)
    
  };

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
      </form>
      <p className='my-1'>
       Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
