import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Redirect, } from 'react-router-dom'

// the import below is made in the attempt to make the code cleaner
//should be going into the a route in the bottom retuen statement
import EditSale from './New/EditSale'



// POST /sale ( Might be missing, if missing should be pretty easy to make)

// PUT sale/:id (will test in the morning)

// DELETE sale/:id (will test in the morning)

const Profile = props => {

	let initialId = props.lists.length ? props.lists[0]._id : ''

	let [ date, setDate ] = useState('')
	let [ address, setAddress ] = useState('')
	let [ list, setList ] = useState(initialId)
	console.log(props.lists.length ? props.lists[0]._id : 'empty')

	//Reactstrap states
	const [modal, setModal] = useState(false);
	const [nestedModal, setNestedModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false)

	//Reactstrap functions
	const toggle = () => setModal(!modal);

	const toggleNested = () => {
	  setNestedModal(!nestedModal);
	  setCloseAll(false);
	}

	const toggleAll = () => {
	  setNestedModal(!nestedModal);
	  setCloseAll(true);
	}

	const submitSale = e => {
		console.log(list)
		e.preventDefault()
		let token = localStorage.getItem('boilerToken')
		fetch(props.url + 'sale', {
			method: 'POST',
			body: JSON.stringify({
				user: props.user._id,
				date,
				address,
				list: list || initialId
			}),
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json' 
				}
			})
			.then(response => {
				console.log('Posting the Sale was Successful')
				
			})
			.catch(err => {
				console.log('There was an error creating a Sale..', err)
			})
		
	}

	//I dont think the useState is effective b/c were
	//were not passing it down from the parent of Profile.js(fix it)
	
	
	// we already have the edit call in EditSale.js
	//Should discuss with Guy, will this delete route be 
	//deleting the list and the items al together??
	//What happens to the list when there is no sale?? null value??
	//Should we make it so that it only deletes the sale date/address??

	const deleteSale = (saleId) => {
		
		let token = localStorage.getItem('boilerToken')
		fetch(props.url + 'sale/' + saleId, {
			method: 'DELETE',
			body: JSON.stringify({saleId}),
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'https://sam-guy-garage.herokuapp.com/'
			}
		})
		.then(() => {
			console.log('delete was successful')
		})
		.catch(err => {
			console.log('Something wrong editing the sale')
		}) 
	}


	const handleChange = e  => {
		console.log(e.target.value)
		setList(e.target.value)
	}

	let listz = props.lists.map((l, i) => {
		return (
			<option value = {l._id} key={i }> {l.listTitle} </option>
		)
	})


	let sales = props.sale.currentSales.map((s, j) => {
		if (s.list)
			return (
				<div key={j}>
					<p>{s.list.listTitle}</p>
					<p>{s.date}</p>
					<p>{s.address}</p>

					<p><strong>Edit Sale</strong></p>
					<EditSale url = {props.url} token = {props.updateToken} sale={s} lists={props.lists}/>
					<button onClick={() => deleteSale(s._id)}>Delete</button>
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
			<Button color="danger" onClick={toggle}>Create a Sale</Button>
      		<Modal isOpen={modal} toggle={toggle}>
        		<ModalHeader toggle={toggle}>Modal title</ModalHeader>
        		<ModalBody>
					<form onSubmit={submitSale}>
						<p><strong>Create a Sale</strong></p>
						<label>Date</label>
						<input type='text' name='date' onChange={e => setDate(e.target.value)} />
						<label>Address</label>
						<input type='text' name='address' onChange={e => setAddress(e.target.value)} />
						<label>list</label>
						<select onChange={handleChange}> {listz} </select>
						<button type="submit">Submit</button>
					</form>
					<br />
					<Button color="success" onClick={toggleNested}>Show Nested Modal</Button>
          			<Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            			<ModalHeader>Nested Modal title</ModalHeader>
            			<ModalBody>Stuff and things</ModalBody>
            			<ModalFooter>
							<Button color="primary" onClick={toggleNested}>Done</Button>{' '}
							<Button color="secondary" onClick={toggleAll}>All Done</Button>
            			</ModalFooter>
          			</Modal>
        		</ModalBody>
        		<ModalFooter>
					<Button color="primary" onClick={toggle}>Do Something</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
        		</ModalFooter>
      		</Modal>
		<div>
			{sales}
		</div>
    </div>
  )
}

export default Profile
