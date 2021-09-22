import React, { Fragment, useState , useEffect} from 'react';
//withRouter allows us to use history object for redirects
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile , getCurrentProfile} from '../../actions/profile';

const EditProfile = ({profile:{profile,loading}, createProfile, getCurrentProfile, history, }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  const [displaySocialLinks, toggleDisplaySocialLinks] = useState(false);

  useEffect(()=> {
    getCurrentProfile()
 //set form data to loading, a blank field, or whatever is stored in db
    setFormData({
      company: loading || !profile.company? '' : profile.company,
      website: loading || !profile.website? '' : profile.website,
      location: loading || !profile.location? '' : profile.location,
      status: loading || !profile.status? '' : profile.status,
      skills: loading || !profile.skills? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername? '' : profile.githubusername,
      bio: loading || !profile.bio? '' : profile.bio,
      twitter: loading || !profile.social? '' : profile.social.twitter,
      facebook: loading || !profile.social? '' : profile.social.facebook,
      linkedin: loading || !profile.social? '' : profile.social.linkedin,
      youtube: loading || !profile.social? '' : profile.social.youtube,
      instagram: loading || !profile.social? '' : profile.social.instagram,
    })
  },[loading])

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram,
    youtube,
  } = formData;

  const handleInputChange = (e) =>
  ///needed to take deconstructed formdata for it to work. To add to existing form data
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> It's great to keep your profile up to date!
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => handleFormSubmit(e)}>
        <div className='form-group'>
          <select
            name='status'
            value={status}
            onChange={(e) => handleInputChange(e)}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => handleInputChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => handleInputChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => handleInputChange(e)}
          />
          <small className='form-text'>
            City & state/province suggested (eg. Toronto, ON)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => handleInputChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => handleInputChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleDisplaySocialLinks(!displaySocialLinks)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialLinks && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard'className='btn btn-light my-1' >
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
})

                                          //again with router acts on the create profile to allow acess to history as a prop
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
