import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

//Go over how tokens are used to make an API call and retrieve info
//Declare API URL that we want to call 

// POST /sale

// PUT sale/:id

// DELETE sale/:id

const Profile = props => {


	// const handleEdit = (listId) => {
	// 	let token = localStorage.getItem('boilerToken')
	// 	fetch(props.url + 'list' + listId, {
	// 		method: 'PUT',
	// 		body: JSON.stringify({listId}),
	// 		headers: {
	// 			'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
	// 		}
	// 	})
	// 	.then(() => {
	// 		console.log('edit was successful')
	// 	}) 
	// }

	// let itemz = props.lists.map((l, i) => {
	// 	return (
	// 		<div key={i}>
	// 			<p>{l.listTitle}</p>
	// 		</div>
	// 	)
	// })


	let sales = props.sale.currentSales.map((s, j) => {
		if (s.list)
			return (
				<div key={j}>
					<p>{s.list.listTitle}</p>
					<p>{s.date}</p>
					<p>{s.address}</p>
				</div>
			)
	})
	if (!props.user) {
		return <Redirect to="/login" />
 	}



  return (
    <div>
		<div>
			<h2>{props.user.firstname}</h2>
			<img src={props.user.pic} alt={props.user.firstname} />
			
		</div>
		<div>
			<button><a href='/posting'>+</a></button>
			{sales}
		</div>
    </div>
  )
}

export default Profile
