import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../services/instance'
import { Link, useNavigate } from 'react-router-dom';


function NavBar() {

  const [name, setName] = useState('');
  const [id, setId] = useState('')
  const navigate = useNavigate();
  const { quantity } = useSelector((state) => state.cart);

  useEffect(() => {
    getName()
  })

  const getName = async () => {
    const response = await instance.protectedInstance.get('/users/getId');
    const res = response.data;
    setName(response.data.user_name);
    const params_id = res.user_ID;
    setId(params_id)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='navigation'>
        <Container>
          <Link to='/'>
            <Navbar.Brand>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAAC9CAMAAACTb6i8AAABblBMVEX///9WW27wBIDtfwb66Br//v96tR0GXqX8//////1UWmthZHdMUWa/wMYAl6DkNDZIUGSBg5NYWm9SV2tJTGOYmqVMU2bMzdLd3eCmqLC3t77///j85QD7//zudgDsfwbw8fPHys746ADvAHgAkJvwdADwAHRurwAAU6GMjpnz9Pbo6OtwcoBCSl6ChpCvsLj89K/67Xf961X67WD584X++Nb898D57m727EP/+eH8++3d8/J9xcRZrLaaztS02tsAlaRrur7785750OXyj7r0UZnyKozyN5DwY6P2qMv96/Utnqr4tM/23uz8+MQAk5Evo6TyV5vxf7So1db2a6b44s30zK73wpjytIbuoln369r21K/svIXzpWrwkkPyn1rwk0e926OpzXGPvknf7s6w0oOHqslMgblvmL/J2eXompXpW1376+umwtblJSP30dIZaKjvt7eZx1TwkpXb68LkFhPogIT21tBYh7k8P1sxyd63AAALhklEQVR4nO2ci38TNxLHtYQFaa2FtbVPO07WeXsf3tJ3Qx9wFChcuWu5hmvTXp/QAqW0vZbr8d/fjNZe24kN6eeauJb1hQ+2tYs/0i8zo9FIG0I0Go1Go9FoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDRAmzFiMtKadT/+DLQpJZSCGosOKNB64cKLL738CmULrwZ7dW157fTa8vJrLbbobvLq2umS5ddb5qw7c/KYJjVNhgNn9I2BFCDGBTrrnp04ZhkY2jByZr421OL02u6suzYDLr751ltvUxNlgVAx1OKFWXfshGGUvbOxce7cxrmL8HZ3xCxOL7/cvwcmWMooVT58mObFjUvnJJRM0wIwTXiZaU+Pnza5XCpx7tI7hLXWRsRY/ouMq4RceffqtVPXrr934yaRGYiqtMlf+1psvAnjfGl5JHa+IU3i/etb66dK1t+7pbJxsDEt6N9GQudLcJnevDoQQoqx/q7CWhByeaPyERj7hYFhrJ1+AxzkyqgSUo0PqbJeYrKLf8fYeencB8TEDOPlZVRjee31V2jrsBRSjFn3+bgwcU4FB9n4IJapZ4u8cuH02tqLL7RJu3XzkBIoxm3KVJ1eGbv49uXL/6hMv2W2WNvErIJ+NEmLU1tX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" width={200} height={95} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto ">
              <Link to='/' className='link-line'><p className='nav-links m-3 mt-4'>HOME</p></Link>
              <Link to='/products' className='link-line'><p className='nav-links m-3 mt-4'>PRODUCTS</p></Link>
              <Link to='/contact' className='link-line'><p className='nav-links m-3 mt-4' >CONTACT</p></Link>
            </Nav>

            <Link to='/cart'>
              <a className="btn btn-success position-relative m-3" >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {quantity}
                </span>
              </a>
            </Link>

            <div>
              {name.length != 0 ? (
                <div>
                  <div class="dropdown">
                    <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span style={{ 'fontSize': '20px', 'fontStyle': 'italic', 'marginRight': '10px' }}>{name}</span>
                      <img className="img-profile rounded-circle" style={{ width: '30px', 'height': '30px' }}
                        src='data:image/png;base64,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' />
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" onClick={() => {
                        navigate(`/orderlist/${id}`)
                      //  window.location.reload();
                      }}>My Orders</a>
                      <a class="dropdown-item" onClick={() => {
                        setName('')
                        sessionStorage.clear();
                        navigate('/')
                        window.location.reload();
                      }} >Logout</a>
                    </div>
                  </div>

                </div>
              ) : (
                <Link to='/signin'>
                  <a className="btn btncolorlogin m-3" onClick={() => {
                    alert("User Credentails....                                                                  Email : testuser@gmail.com                       Password : test@123   Admin Credentails....                                                                  Email : admin@gmail.com                       Password : admin@123")
                  }}
                  ><span style={{ fontWeight: 'bold' }}>Login</span>  <i className="fa-solid fa-right-to-bracket"></i></a>
                </Link>
              )}

            </div>



          </Navbar.Collapse>

        </Container>

      </Navbar>

      <hr />
    </>
  )
}

export default NavBar