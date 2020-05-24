import React, { Component } from 'react';
import styled from 'styled-components'

import MapboxGLMap from './MapboxGLMap'

const Discovery = props => {

  

  let discovery = props.discoveries.publicSales.map((d, i) =>{
    console.log(props.discoveries)
    let itemz = d.list.item.map((x, y) => {
        return (
        <div key={y}>
            <img src={x.image}></img>
            <p>Item</p>
            <p>{x.name}</p>
            <p>Price</p>
            <p>${x.price}</p>
            <p>Condition</p>
            <p>{x.condition}</p>
        </div> 
        )
    })
    return(
          <div key={i}>
          <p>Address: {d.address}</p>
          <p>Date: {d.date}</p>
            {itemz}
        </div>
    )
})

      let Header = styled("header")`
      width: 100vw;
      height: 80px;
      border-bottom: 2px solid #222;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    let Layout = () => {
      return (
        <>
          <Header>
            <h1>Mapbox GL Components</h1>
          </Header>
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