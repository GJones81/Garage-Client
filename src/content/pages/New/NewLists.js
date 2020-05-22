import React from 'react';


// POST /list

// PUT list/:id

// DELETE list/:id


//This is a form to add a listing for a garage sale 
const NewLists = props => {

    return (
        <div>
            <h5>Host a Garage Sale(Listing)</h5>
            <form>
                <label>Address:</label>
                <input type="text" />
                <label>Date:</label>
                <input/>
                
                <input type="hidden" name="userId"/>
                
                <input type="hidden" name=""/>
            </form>
        </div>
    )
}

export default NewLists