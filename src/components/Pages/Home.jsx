import React from 'react'
import Products from './Products'
import NavBar from './NavBar'
import Footer from './Footer'

function Home() {
  return (
    <>
    <NavBar />
      <div style={{ marginTop: '-16px' }}>

        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{height:'400px'}}/>
              <div className="carousel-caption  d-md-block" style={{height:'40vh'}}>
                <h1 style={{marginBottom:'15px',fontStyle:'italic',color:'#0b1f18a3',}}>Upto <span style={{fontSize:'55px'}}>30%</span> Off</h1>
                <h2 style={{marginBottom:'15px',fontStyle:'italic',color:'#0b1f18a3',}}>Deals on Clothing and Electronics products</h2>
                <h6 style={{fontStyle:'italic',color:'orange',}}>USE CODE : 6FES8TV</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products />
      <Footer />
    </>
  )
}

export default Home