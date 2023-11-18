import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { Modal, Button, Form } from "react-bootstrap";
import instance from '../../services/instance'
import { useNavigate } from 'react-router-dom';

const Product = ({ id, image, title, price, rate, count, Brand, category, description, stock }) => {

  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    getName()
  })

  const getName = async () => {
    const response = await instance.protectedInstance.get('/users/getId');
    const res = response.data;
    setName(response.data.user_name);
  }

  const addtocart = () => {
    if (name.length == 0) {
      getName();
     // console.log("NAME " + name)
     alert("Please Login to Continue....                                                                 User Credentails....                                                                  Email : testuser@gmail.com                       Password : test@123   Admin Credentails....                                                                  Email : admin@gmail.com                       Password : admin@123")
    }
    else {
      dispatch(addToCart({ id, image, title, price }))
      handleClose()
    }
  }

  const rateFunction = ({ rate }) => {
    // console.log(rate)
  }
  return (
    <>

      <div className="col-sm-3 m-5">
        <div className="card border-warning h-100 text-center p-4" style={{width: "25rem"}}  key={id}>
          <img src={image} className="card-img-top" alt={title} height="250px" onClick={handleShow} />
          <div className="card-body">
            <h5 className="card-title mb-0 mt-2 mb-2" onClick={handleShow}>{title.substring(0, 20)}...</h5>
            <h6 className=" fst-italic" style={{ color: 'darkgoldenrod' }} onClick={handleShow}>{Brand}</h6>
            <p className="card-text fs-5 fw-bold" style={{ color: 'black' }}>
              <span style={{ fontSize: "16px" }} onClick={handleShow}>₹ </span>
              {price}
            </p>
            <div className="rating mb-4" onLoad={rateFunction({ rate })} onClick={handleShow}>
              <span>{rate} </span>
              <i className="rating__star far fa-star"></i>
              <i className="rating__star far fa-star"></i>
              <i className="rating__star far fa-star"></i>
              <i className="rating__star far fa-star"></i>
              <i className="rating__star far fa-star"></i>
              <span style={{ color: 'blue' }}> ({count} reviews) </span>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                  <button className='btn btncolorcart' onClick={addtocart}>
                   Add to Cart
                </button>
              </div>
              <div className='col-sm-6'>
                  <button className='btn btncolorbuy' onClick={()=>{
                    addtocart();
                    navigate('/cart')
                  }}>
                  Buy Now
                </button>
              </div>
            </div>                       
          </div>
        </div>
      </div>


      {/* For Modal Popup */}
      <div className='modal-dialog modal-dialog-centered '>
        <Modal show={show} size="lg" onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title style={{ 'textAlign': 'center' }}>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="h-100 gradBG">
              <div className="container  h-50 w-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col">
                    <div className="card card-registration my-4">
                      <div className="row g-0">
                        <div className="col-xl-6 d-none d-xl-block">
                          <img src={image}
                            alt="Sample photo" className="img-fluid"
                            style={{ 'borderTopLeftRadius': ".25rem", 'borderBottomLeftRadius': '.25rem', 'height': '350px' }} />
                        </div>
                        <div className="col-xl-6">
                          <div className="card-body">
                            <h5 className="card-title mb-0 mt-2 mb-2" onClick={handleShow}>{title}</h5>
                            <h6 className=" fst-italic" style={{ color: 'darkgoldenrod' }} onClick={handleShow}><span style={{ color: 'black' }}>Brand: </span> {Brand}</h6>
                            <p className="card-text fs-5 fw-bold" style={{ color: 'black' }}>
                              <span style={{ fontSize: "16px" }} onClick={handleShow}>₹ </span>
                              {price}
                            </p> 
                            <p>{category} - <span style={{color:'green'}}>{stock}</span></p>
                            <div className="rating mb-4" onLoad={rateFunction({ rate })} onClick={handleShow}>
                              <span>{rate} </span>
                              <i className="rating__star far fa-star"></i>
                              <i className="rating__star far fa-star"></i>
                              <i className="rating__star far fa-star"></i>
                              <i className="rating__star far fa-star"></i>
                              <i className="rating__star far fa-star"></i>
                              <span style={{ color: 'blue' }}> ({count} ratings) </span>
                            </div>
                            <p>{description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </Modal.Body>
          <Modal.Footer>
            <button className='btn btncolorcart' onClick={addtocart}>
              <i className="fa-solid fa-cart-shopping"></i>  Add to Cart
            </button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Product











