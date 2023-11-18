import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../services/instance'
import Form from 'react-bootstrap/Form';
import Footer from './Footer';
import NavBar from './NavBar';

function Contact() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState('');
  const [msgg, setMsgg] = useState('');


  const handleCreate = (event) => {
    event.preventDefault();
    if (name != '' && email != '' && phone != '' && message != '') {
      createContact({ name, email, phone, message })
    }
    else {
      setMsgg("Please fill the details")
    }
  }

  const createContact = async (details) => {
    try {
      const response = await instance.authInstance.post('/contact', details);
      setMsg('Our team will get in touch with you soon!!')
      setMsgg('')
      alert('Our team will get in touch with you soon!!')
      navigate('/')
    }
    catch (error) {
      console.log("Error in creating contact " + error)
      setMsgg("Please fill all the fields");
    }

  }

  return (
    <>
    <NavBar />
      <section className="h-100 gradBG">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img src="https://www.shutterstock.com/image-photo/contact-us-word-written-on-260nw-1766354378.jpg"
                      alt="Sample photo" className="img-fluid"
                      style={{ 'borderTopLeftRadius': ".25rem", 'borderBottomLeftRadius': '.25rem', 'height': '580px' }} />
                  </div>
                  <div className="col-xl-6">
                    <Form onSubmit={handleCreate}>
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-3 text-uppercase" style={{ color: "#0b1f18a3", 'fontWeight': 'bolder', 'textAlign': 'center' }}>CHAT WITH US</h3>
                        <p className="mb-5" style={{fontStyle:'italic','textAlign': 'center'}}>👋Hello ! Please message us if you have any questions or want to talk !</p>
                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg"
                            value={name}
                            placeholder='Name'
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="email" className="form-control form-control-lg"
                            placeholder="Email ID"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg"
                            placeholder='Contact'
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg"
                            placeholder='Message'
                            value={message}
                            onChange={(event) => setMessage(event.target.value)} />
                        </div>



                        <div>
                          <p style={{ color: "#2fe62f", "fontSize": '20px' }}>{msg} </p>
                          <p style={{ color: "red" }}>{msgg}</p>
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <button type="button" className="btn btn-light btn-lg"
                            onClick={() => {
                              navigate('/')
                            }}>
                            Cancel</button>
                          <button type="Submit" className="btn btn-success btn-lg ms-2">Send</button>
                        </div>

                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Contact