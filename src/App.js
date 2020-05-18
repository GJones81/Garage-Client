// Import packages
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  // useEffect hook
  useEffect(() => {
    decodeToken()
  }, [])

  const decodeToken = () => {
    let token = localStorage.getItem('boilerToken')
    if (token) {
      //Decrypt user data from the token
      let decodedUser = jwtDecode(token)

      //If the token is not valid or expired, user stays out
      if (!decodedUser || Date.now() > decodedUser.exp * 1000) {
          console.log('Expired or Bad token')
          setUser(null)
      }
      else {
        console.log('User and token are good')
        setUser(decodedUser)
      }
    }
    else {
      //No user logged in
      console.log('No user logged in')
      setUser(null)
    }
  }

  const updateToken = (newToken) => {
    localStorage.setItem('boilerToken', newToken || '')

    decodeToken()
  }

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken} />
        <Header />
        <main>
          <Content user={user} updateToken={updateToken} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
