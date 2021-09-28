import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { editComment } from '../../actions/post';

const EditComment = ({ post: { loading, post }, editComment, history }) => {
  const [text, setText] = useState('');
  const { postId, commentId } = useParams();

  useEffect(() => {
    if (post) {
      const commentContents = post.comments.filter(
        (comment) => comment._id === commentId
      );
      setText(commentContents[0].text);
    }
  }, [post.comments]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    editComment(postId, commentId, { text });
    
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Edit Comment</h3>
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

EditComment.propTypes = {
  editComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { editComment })(EditComment);
