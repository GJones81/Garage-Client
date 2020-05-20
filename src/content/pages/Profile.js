import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

//Go over how tokens are used to make an API call and retrieve info
//Declare API URL that we want to call 


//this component should list all the items 

const Profile = props => {

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
			
		</div>
		<div>
			<button><a href='/posting'>+</a></button>
			{/* {itemz} */}
		</div>
    </div>
  )
}

export default Profile
