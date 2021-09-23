import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEducation, getCurrentProfile } from '../../actions/profile';
import moment from 'moment';

const EditEducation = ({
  profile: { profile, loading },
  editEducation,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, setToDateDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const { edu_id } = useParams();

  useEffect(() => {
    getCurrentProfile();

    const education = profile.education.filter((edu) => edu._id === edu_id);
    const fromDate = moment(education[0].from).format('YYYY-MM-DD');
    const toDate = moment(education[0].to).format('YYYY-MM-DD');

    setFormData({
      school: loading || !education[0].school ? '' : education[0].school,
      degree: loading || !education[0].degree ? '' : education[0].degree,
      fieldofstudy:
        loading || !education[0].fieldofstudy ? '' : education[0].fieldofstudy,
      from: loading || !education[0].from ? '' : fromDate,
      to: loading || !education[0].to ? '' : toDate,
      current: loading || !education[0].current ? '' : education[0].current,
      description:
        loading || !education[0].description ? '' : education[0].description,
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, edu_id, getCurrentProfile]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    editEducation(formData, edu_id, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Edit any current/past education
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => handleFormSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School'
            name='school'
            value={school}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            value={degree}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
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
            Current School
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
            placeholder='Education Description'
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

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  education: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  education: state.profile.education,
});

export default connect(mapStateToProps, { editEducation, getCurrentProfile })(
  EditEducation
);
