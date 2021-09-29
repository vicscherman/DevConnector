import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Register from '../auth/Register';
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import EditExperience from '../profile-forms/EditExperience';
import EditEducation from '../profile-forms/EditEducation';
import Profile from '../profile/Profile'
import Profiles from '../profiles/Profiles';
import Posts from '../posts/Posts';
import Post from '../post/Post'
import EditPost from '../posts/EditPost';
import EditComment from '../post/EditComment';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound'

 const Routes = () => {
  return (
    <section className='container'>
    <Alert />
    <Switch>
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/profile/:id' component={Profile} />
      <Route exact path='/profiles' component={Profiles} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/create-profile' component={CreateProfile} />
      <PrivateRoute exact path='/edit-profile' component={EditProfile} />
      <PrivateRoute exact path='/add-experience' component={AddExperience} />
      <PrivateRoute exact path='/add-education' component={AddEducation} />
      <PrivateRoute exact path='/edit-experience/:exp_id' component={EditExperience}/>
      <PrivateRoute exact path='/edit-education/:edu_id' component={EditEducation}/>
      <PrivateRoute exact path='/posts' component={Posts}/>
      <PrivateRoute exact path='/posts/:postId' component={Post}/>
      <PrivateRoute exact path='/posts/edit/:postId' component={EditPost}/>
      <PrivateRoute exact path='/posts/edit/:postId/:commentId' component={EditComment}/>
      <Route component={NotFound} />
    </Switch>
  </section>
  )
}

export default Routes