import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

function Error() {
  return (
    <>
    <NavBar/>

    <div className='m-5' style={{textAlign:'center'}}>
        <h2>No items in cart to display ...</h2>
    </div>
    
    </>
  )
}

export default Error