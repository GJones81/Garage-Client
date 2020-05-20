import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

//Go over how tokens are used to make an API call and retrieve info
//Declare API URL that we want to call 


const Profile = props => {
	

	let itemz = props.item.currentList.map((l, i) => {
		return (
			<div key={i}>
				<p>{l.listTitle}</p>
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
