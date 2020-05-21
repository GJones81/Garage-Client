// Packages
import React, { useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react' 
import clodinaryCore from 'cloudinary-core'

// Custom component
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Discovery from './pages/Discovery'
import Posting from './pages/Posting'
import Axios from 'axios'

const API_URL = 'https://localhost3000/'

const Content = props => {

  let token = localStorage.getItem('boilerToken')

  let [item, setItem] = useState({currentList: []})
  let [sale, setSale] = useState({currentSales: []})
  let [thisUser, setThisUser] = useState(false)
  let [secretMessage, setSecretMessage] = useState('')

  //calls the List model to retrieve the List data 
  const callListAPI = () => {
   let token = localStorage.getItem('boilerToken')
   console.log('ListAPI Function running')
   fetch('http://localhost:3000/list', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })
   .then(listResponse => {
     console.log('ListAPI',listResponse)
     return listResponse.json()
   })
   .then(listData => {
     console.log('ListAPI', listData)
     setItem(listData)
   })
   .catch(err => {
     console.log(err, 'Error fetching the ListAPI')
   })
 }

 //calls the Sale model to retrieve the Sale data
 const callSaleAPI = () => {
   let token = localStorage.getItem('boilerToken')
   console.log('SaleAPI Function running')
   fetch('http://localhost:3000/sale', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })
   .then(saleResponse => {
     console.log('SaleAPI', saleResponse)
     return saleResponse.json()
   })
   .then(saleData => {
     console.log('SaleAPI', saleData)
     setSale(saleData)
   })
   .catch(err => {
     console.log(err, 'Error fetching the SaleAPI')
   })
 }

 //calls the ListAPI on line 28
 useEffect(() => {
   callListAPI()
   callSaleAPI()
 }, [])

 //calls the SaleAPI on line 51
 // useEffect(() => {
 //   callSaleAPI()
 // }, [])

 useEffect(() => {
   let token = localStorage.getItem('boilerToken')
   console.log(token)
   fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })
   .then(response => {
     //response = token(from the server side)
     console.log('Response', response)
     if (!response.ok) {
       setSecretMessage('Nice try!')
       return
     }
     response.json()
     .then(result => {
       console.log(result)
       setSecretMessage(result.message)
       
     })
   })
   .catch(err => {
     console.log(err)
     setSecretMessage('No message for YOU!')
   })
 }, [])
 if (!props.user) {
   return <Redirect to="/login" />
 }

  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} url={API_URL} item={item} sale={sale}/>
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/discovery" render={
        () => <Discovery user={props.user} />
      } />
      <Route path="/posting" render={
        () => <Posting user={props.user} item={item} sale={sale} />
      } />
    </div>
  )
}

export default Content
