import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import EditExperience from './components/profile-forms/EditExperience';
import EditEducation from './components/profile-forms/EditEducation';
import Profile from './components/profile/Profile'
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post'
import EditPost from './components/posts/EditPost';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'

if(localStorage.token) {
  //set header with token
  setAuthToken(localStorage.token);
}

//only runs on load(empty dependency array)
const App = () => {
  useEffect(()=> {
   store.dispatch(loadUser()) 
  },[])



  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
