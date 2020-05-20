import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

//Go over how tokens are used to make an API call and retrieve info
//Declare API URL that we want to call 
const API_URL = 'https://localhost3000/list'

//this component should list all the items 

const Profile = props => {

	let [secretMessage, setSecretMessage] = useState('')
 
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
	})
	if (!props.user) {
		return <Redirect to="/login" />
	}

	//maybe going to need a useEffect that calls the API
	const callAPI = () => {
		fetch(API_URL, {
			// method: POST
		})
		.then(response => response.json)
		.then(data => {
			console.log(data)
		})
		.catch(err => {
			console.log(err, 'Error fetching the API')
		})
	}

	// let itemz = props.list.item.map((l, i) => {
	// 	return (
	// 		<div key={i}>
	// 			<img src={l.image} />
	// 			<p>{l.name}</p>
	// 			<p>{l.price}</p>
	// 			<p>{l.condition}</p>
	// 		</div>
	// 	)
	// })

  return (
    <div>
		<div>
			<h2>{props.user.firstname}</h2>
			<img src={props.user.pic} alt={props.user.firstname} />
			<h2>{secretMessage}</h2>
		</div>
		<div>
			{/* {itemz} */}
		</div>
    </div>
  )
}

export default Profile
