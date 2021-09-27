import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost, editPost } from '../../actions/post';

const EditPost = ({ post: { post, loading }, editPost, getPost }) => {
  const [text, setText] = useState('');

  const { postId } = useParams();

  useEffect(()=> {
    getPost(postId)
setText(post.text)
    // setText(post.text)
  },[getPost, postId, post.text])





  const handleFormSubmit = (e) => {
    e.preventDefault();
    editPost({ text }, postId);

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
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost, editPost })(EditPost);
