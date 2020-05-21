import React, { useState } from 'react';

// POST list/item
// const listItemAPI = () => {
//     let token = localStorage.getItem('boilerToken')
//     fetch('http://localhost:3000/list/item', {
//         method: 'POST',
//         body: JSON.stringify({
//             user: req.user
            
//         }),
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
// }

// PUT list/item/:id

// DELETE list/item/:id


//This is the form to add a new item to the list 
const NewItem = props => {
    let [name, setName] = useState('')
    let [price, setPrice] = useState('')
    let [image, setImage] = useState('')
    let [condition, setCondition] = useState('')
    let [listTitle, setListTitle] = useState('')


    //fix tomorrrow
    const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
        fetch(props.url + 'list/item', {
            method: 'POST',
            body: JSON.stringify({
                listTitle,
                name,
                price,
                image,
                condition
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
                console.log('item was created')
                //recall the API to populate with new info that was given(typed)
                setName('')
                setPrice('')
                setImage('')
                setCondition('')
                
            })
    }


    

    let checkUploadResult = (resultEvent) => {
        
        if (resultEvent.event === 'success') {
            props.postPhoto({
                user_id: props.currentUser.id,
                caption: '',
                url: resultEvent.info.secure_url
            })
            .then(props.history.push('/profile'))
        }
    }
    


    let widget = window.cloudinary.createUploadWidget({
        cloudName: "swaggyi",
        uploadPreset: "Garage" } ,
        (error, result) => { 
            checkUploadResult(result)
        })

        const showWidget = (widget) => {
            widget.open()
        
        }

    return (
        <div>
            <div className="itemForm">
                <button onClick={() => showWidget(widget)}>Upload</button>
                <form onSubmit={handleSubmit}>
                <label>List Title:</label>
                        <input type="text" name="listTitle" onChange={e => setListTitle(e.target.value)} />
                    <label>Image:</label>
                        <input type="text" name="image" onChange={e => setImage(e.target.value)} />
                    <label>Name:</label>
                        <input type="text" name="name" onChange={e => setName(e.target.value)}/>
                    <label>Condition:</label>
                        <input type="number" name="condition" onChange={e => setCondition(e.target.value)}/>
                    <label>Price:</label>
                        <input type="number" name="price" onChange={e => setPrice(e.target.value)}/>
                    <input type="submit" />
                </form>  
            </div>
        </div>
    )
}

export default NewItem