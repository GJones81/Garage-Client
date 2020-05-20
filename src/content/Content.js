// Packages
import React from 'react'
import { Route } from 'react-router-dom'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react' 
import clodinaryCore from 'cloudinary-core'

// Custom componentd
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Discovery from './pages/Discovery'
import Posting from './pages/Posting'
import Axios from 'axios'

const Content = props => {

  let token = localStorage.getItem('boilerToken')

  const callAPI = () => {
    console.log('API called')
  }


  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/discovery" render={
        () => <Discovery user={props.user} />
      } />
      <Route path="/posting" render={
        () => <Posting user={props.user} />
      } />
    </div>
  )
}

export default Content
