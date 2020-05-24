import React, { Component } from 'react';
import styled from 'styled-components'

import MapboxGLMap from './MapboxGLMap'

const Discovery = props => {
  console.log(props.discoveries)
  let discovery = props.discoveries.publicSales.map((d, i) =>{
    return (
      <div key={i}>
        <p>Address: {d.address}</p>
        <p>Date: {d.date}</p>
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