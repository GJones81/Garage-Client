import React, { useState } from 'react';

//This is the form to add a new item to the list 
const NewItem = props => {

    // let [listItem, setListItem] = useState()

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
                <form>
                    <label>Image:</label>
                        <img src="url" />
                    <label>Name:</label>
                        <input type="text" name="name" />
                    <label>Condition:</label>
                        <input type="number" name="condition" />
                    <label>Price:</label>
                        <input type="number" name="price" />
                </form>  
            </div>
        </div>
    )
}

export default NewItem