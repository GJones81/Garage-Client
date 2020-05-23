import React, {useState} from 'react';


//Need to add this as a Router i think on Profile.js and import it??
//<EditSale url = {props.url} token = {props.updateToken} sale={s}/>
//I dont think there is a name for sale, b/c sale is 
// only the date and address, tech. listTitle is the sale name 

const EditSale = props => {

    let initialId = props.lists.length ? props.lists[0]._id : ''

    let [ saleId, setSaleId ] = useState(props.sale._id)
    
    let [ address, setAddress ] = useState(props.sale.address)
    let [ date, setDate ] = useState(props.sale.date)
    let [ list, setList ] = useState(initialId)
    
    //am i targeting this right, because sale
    const submitEdit = e => {
        e.preventDefault()
        console.log('hitting the PUT route for editing a sale ')
        let token = localStorage.getItem('boilerToken')
        fetch(props.url + 'sale/' + saleId, {
            method: 'PUT',
            body: JSON.stringify ({
                saleId: props.sale._id,
                address,
                date
            }),
             headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             }
        })
        .then(response => {
            console.log('sale was edited')
            setAddress('')
            setDate('')
        })
        .catch(err => {
            console.log('There was an error editing the sale')
        })
    } 

    const handleChange = e  => {
		console.log(e.target.value)
		setList(e.target.value)
    }
    
    let listz = props.lists.map((l, i) => {
		return (
             <option key={i} value = {l._id}> {l.listTitle} </option>
		)
	})

    return (
        <div>
            <form onSubmit={submitEdit}>
                <label>Date</label>
                
                <input type='text' name='date' onChange={e => setDate(e.target.value)} /> 
                <label>Address</label>
                <input type='text' name='address' onChange={e => setAddress(e.target.value)} /> 
                <select onChange={handleChange}> {listz} </select>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default EditSale