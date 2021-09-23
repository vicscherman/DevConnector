import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExperience, getCurrentProfile } from '../../actions/profile';
import moment from 'moment';

const EditExperience = ({
  profile: { profile, loading },
  editExperience,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, setToDateDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const { exp_id } = useParams();

  useEffect(() => {
    getCurrentProfile();

    const job =  profile.experience.filter((exp) => exp._id === exp_id);
    const fromDate = moment(job[0].from).format('YYYY-MM-DD')
    const toDate = moment(job[0].to).format('YYYY-MM-DD')


    setFormData({
      company: loading || !job[0].company ? '' : job[0].company,
      title: loading || !job[0].title ? '' : job[0].title,
      location: loading || !job[0].location ? '' : job[0].location,
      from: loading || !job[0].from ? '' : fromDate,
      to: loading || !job[0].to ? '' : toDate,
      current: loading || !job[0].current ? '' : job[0].current,
      description: loading || !job[0].description ? '' : job[0].description,
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, exp_id, getCurrentProfile]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    editExperience(formData, exp_id, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Edit any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => handleFormSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                setToDateDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => handleInputChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => handleInputChange(e)}
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

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  experience: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  experience: state.profile.experience,
});

export default connect(mapStateToProps, { editExperience, getCurrentProfile })(
  EditExperience
);
