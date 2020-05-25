import React, { Component } from 'react';
import styled from 'styled-components'

import MapboxGLMap from './MapboxGLMap'
let [showItems, setShowItems ] = useState('')


const Discovery = props => {

  let discovery = props.discoveries.publicSales.map((d, i) =>{

    let revealItems = () => {
      console.log({items})
      console.log(props.discoveries)
      return (
        { items }
      )
    }

    console.log(props.discoveries)
    let items = d.list.item.map((x, y) => {
        return (
        <div key={y}>
            <img src={x.image}></img>
            <p>Item</p>
            <p>Name: {x.name}</p>
            <p>Price: ${x.price}</p>
            <p>Condition: {x.condition}</p>
        </div> 
        )
    })
    return(
          <div key={i}>
          <p>Address: {d.address}</p>
          <p>Date: {d.date}</p>
          <button onClick={revealItems} item={props.item}>See the items for sale</button>
          {showItems}
        </div>
    )
})

      

    let Layout = () => {
      return (
        <>
            <h1>Look for Sales</h1>
          <main>
            <MapboxGLMap />
          </main>
        </>
      );
    };


    return (
      <div>
        <div>
          <Layout />
        </div>
        <div>
          { discovery }
        </div>
      </div>
    )
}

export default Discovery