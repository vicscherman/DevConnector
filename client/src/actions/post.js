import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS,GET_POST, POST_ERROR, UPDATE_LIKES , DELETE_POST, ADD_POST, ADD_COMMENT, REMOVE_COMMENT, EDIT_POST, EDIT_COMMENT} from './types';

const config = {
  headers: {
    'Content-Type':'application/json'
  }
}

//Get all Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD Likes

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, likes: res.data}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
 //remove Like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, likes: res.data}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE post
export const deletePost = (postId) => async (dispatch) => {
  try {
     await axios.delete(`/api/posts//${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId
    });
    dispatch(setAlert('Post Deleted','success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD POST

export const addPost = (formData) => async (dispatch) => {
  try {
  const res=   await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Created','success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//to edit a post's text

export const editPost = (formData,  postId) => async(dispatch) => {
try{
const res = await axios.put(`/api/posts/edit/${postId}`, formData, config)

dispatch({
  type: EDIT_POST,
  payload: res.data
})
dispatch(setAlert('Post Edited', 'success'));



}catch(err){
  dispatch({
    type: POST_ERROR,
    payload: {msg: err.response.statusText, status: err.response.status}
  })
  dispatch(setAlert('There was a problem editing your post', 'danger'));
}


}

//get one post with comments

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add a comment to a post

export const addComment = (postId, formData) => async (dispatch) => {
  try {
  const res=   await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment Added','success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete a comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
  await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert('Comment Deleted','success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editComment = (postId, commentId, formData) => async dispatch => {

try{
  const res = await axios.put(`/api/posts/comment/edit/${postId}/${commentId}`,formData, config)
  dispatch({
    type: EDIT_COMMENT,
    payload: res.data
  })
  dispatch(setAlert('Comment Edited','success'));
    
  }catch(err){
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    dispatch(setAlert('There was a problem editing your Comment', 'danger'));
  }

}