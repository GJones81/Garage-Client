import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

//Go over how tokens are used to make an API call and retrieve info
//Declare API URL that we want to call 


//this component should list all the items 

const Profile = props => {
	
	
	// let itemz = props.item.currentList.map((l, i) => {
	// 	l.item.map((x, y) => {
	// 		return (
	// 			<div key={y}>
	// 				<img src={x.image} />
	// 				<p>{x.name}</p>
	// 				<p>{x.price}</p>
	// 				<p>{x.condition}</p>
	// 			</div>
	// 		)
	// 	})
	// 	console.log(l)
	// })

	let itemz = props.item.currentList[0].item.map((l, i) => {
		return (
			<div key={i}>
				<img src={l.image} />
				<p>{l.name}</p>
				<p>{l.price}</p>
				<p>{l.condition}</p>
			</div>
		)
	})

  return (
    <div>
		<div>
			<h2>{props.user.firstname}</h2>
			<img src={props.user.pic} alt={props.user.firstname} />
			
		</div>
		<div>
			<button><a href='/posting'>+</a></button>
			{itemz}
		</div>
    </div>
  )
}

export default Profile
