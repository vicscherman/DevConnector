import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';


const AddEducation = ({addEducation, history}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, setToDateDisabled] = useState(false)

  const {school, degree, fieldofstudy, from, to, current, description} = formData

  const handleInputChange = e=> setFormData({...formData, [e.target.name] : e.target.value})

  const handleFormSubmit = (e) => {
    e.preventDefault()
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any relevant school, bootcamps, or courses you've attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => handleFormSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='* School or Bootcamp' name='school' value ={school} onChange={e => handleInputChange(e)} required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Degree or Certificate' name='degree'value ={degree} onChange={e => handleInputChange(e)}  required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Field of Study' name='fieldofstudy' value ={fieldofstudy} onChange={e => handleInputChange(e)} />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value ={from} onChange={e => handleInputChange(e)}  />
        </div>
        <div className='form-group'>
          <p>
            <input type='checkbox' name='current' checked={current} value ={current} onChange={e => {setFormData({...formData, current: !current});
            setToDateDisabled(!toDateDisabled)
          }} />{' '}Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' value ={to} onChange={e => handleInputChange(e)}
          disabled={toDateDisabled? 'disabled': ''} />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Degree/Course description'
            value ={description} onChange={e => handleInputChange(e)} 
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
