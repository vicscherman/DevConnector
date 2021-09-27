import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {  editPost } from '../../actions/post';

const EditPost = ({ post:{loading, post}, editPost  })  => {
  const [text, setText] = useState('');




//needed to check for post to be non null

useEffect(()=> {
  if(post){
setText(post.text)
  }

},[ post])






  const handleFormSubmit = (e) => {
    e.preventDefault();
    editPost({ text },post._id );

    setText('');
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Edit Post</h3>
        </div>
        <form className='form my-1' onSubmit={(e) => handleFormSubmit(e)}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
          <Link to='/posts' className='btn btn-light'>
            Back to Posts
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {  editPost })(EditPost);
