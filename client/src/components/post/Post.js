import React , {Fragment, useEffect} from 'react'
import {useParams , Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import {getPost} from '../../actions/post'

const Post = ({getPost, post:{post, loading}}) => {
  const {postId} = useParams()

  useEffect(()=> {
    getPost(postId)
  },[getPost, postId])

  return (
   loading || post === null ? <Spinner /> :<Fragment>
     <Link to="/posts" className="btn">Back to Posts</Link>
     <PostItem post={post} showActions={false} />
     <CommentForm postId={post._id} showActions={false} />
     <div className="comments">
       {post.comments.map(comment => {
       return  <CommentItem key={comment._id}  comment={comment} postId={postId} />
       })}
     </div>
   </Fragment>
  )
}

Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired,
}

const mapStateToProps= state=> ({
  post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
