import React, { useState } from 'react';



//This is the form to add a new item to the list 
const EditItem = props => {
    let [name, setName] = useState(props.list.item.name)
    let [price, setPrice] = useState(props.list.item.price)
    let [image, setImage] = useState(props.list.item.image)
    let [condition, setCondition] = useState(props.list.item.condition)
    let [ imageUrl, setImageUrl ] = useState('')
    let [itemId, setItemId] = useState(props.item._id)
    


    //POST list/item Adds a new item to an existing list
    const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
        fetch(props.url + 'list/item/' + itemId, {
            method: 'PUT',
            body: JSON.stringify({
                listId: props.list._id,
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
                props.refresh()
                setName('')
                setPrice('')
                setImage('')
                setCondition('')
                setImageUrl('')
            })
    }


    

    let checkUploadResult = (resultEvent) => {
        
        if (resultEvent.event === 'success') {
            setImageUrl(resultEvent.info.secure_url)
            setImage(resultEvent.info.secure_url)
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
                    <p>Edit: {props.item.name}</p>
                    <label>Image:</label>
                        <input type="hidden" name="image" value={imageUrl} />
                        <img src={imageUrl} name='image' /> 
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

export default EditItem