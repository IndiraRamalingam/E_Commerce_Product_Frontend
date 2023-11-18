import React, { useEffect, useState } from 'react'
import instance from '../../services/instance';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import AdminNavBar from './AdminNavBar';
import Footer from '../Pages/Footer';

function AddProduct() {
  const navigate=useNavigate()
  const [productData, setProductData] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [rate, setRate] = useState('');
  const [count, setCount] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('')

  useEffect(() => {
    getAllProducts()
  }, [id])

  const getAllProducts = async () => {
    try {
    const response = await instance.authInstance.get(`/admin/allProducts`);
    setProductData(response.data)
    var arr=[];
    let filteredID = productData.map((e)=>{
      arr.push(e.id)
    })
    var max_value=Math.max(...arr)+1;
    //console.log(max_value)
    setId(max_value)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

  const handleCreate = (e) => {
    e.preventDefault();
    createProduct({id,title,price,description,category,image,rate,count,stock,brand})
  }

  //API request to add new product
  const createProduct = async(details) =>{
    try{
      const response=await instance.authInstance.post(`/admin/addProduct`,details)
      // console.log(response.status)
       alert('Product has been added successfully')
      navigate('/viewProduct')
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <>
      <AdminNavBar />
      <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">

              <section className="h-100 gradBG" >
                <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                      <div className="card card-registration my-4">
                        <div className="row g-4">
                          <div className="col-xl-12">
                            <Form onSubmit={handleCreate}>
                              <div className="card-body p-md-5 text-black">
                                <h3 className="mb-5 text-uppercase" style={{ color: "#301091", 'fontWeight': 'bolder', 'textAlign': 'center' }}>Add New PRODUCT</h3>
                                {/* 1st row */}
                                <div className='row'>
                                  <div className='col-sm-6'>
                                    <div className="form-outline mb-4">
                                      <input type="text" className="form-control form-control-lg"
                                        value={id}
                                        placeholder='Product ID'
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className='col-sm-6'>
                                    <div className="form-outline mb-4">
                                      <input type="text" className="form-control form-control-lg"
                                        value={title}
                                        placeholder='Product Title'
                                        onChange={(event) => setTitle(event.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* 2nd row */}
                                <div className='row'>
                                  <div className='col-sm-6'>
                                    <div className="form-outline mb-4">
                                      <input type="number" className="form-control form-control-lg"
                                        value={price}
                                        placeholder='Price'
                                        onChange={(event) => setPrice(event.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className='col-sm-6'>
                                    <div className="form-outline mb-4">
                                      <input type="text" className="form-control form-control-lg"
                                        value={brand}
                                        placeholder='Product Brand'
                                        onChange={(event) => setBrand(event.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* 3rd row */}
                                <div className='row'>
                                  <div className='col-sm-6'>
                                    <div className="form-outline mb-4">
                                      <input type="number" className="form-control form-control-lg"
                                        value={rate}
                                        placeholder='Product Rating'
                                        onChange={(event) => setRate(event.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                <div className='col-sm-6'>
                                  <div className="form-outline mb-4">
                                    <input type="number" className="form-control form-control-lg"
                                      value={count}
                                      placeholder='Review Count'
                                      onChange={(event) => setCount(event.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* 4th row */}
                              <div className='row'>
                                <div className='col-sm-6'>
                                  <div className="form-outline mb-4">
                                    <select required className="form-select form-select-lg mb-3" onChange={(e) => setCategory(e.target.value)}>
                                      <option value="" disabled >--Category--</option>
                                      <option value="Men's clothing" >Men's clothing</option>
                                      <option value="Electronics">Electronics</option>
                                      <option value="Women's clothing">Women's clothing</option>
                                      <option value="Jewelery">Jewelery</option>
                                    </select>
                                  </div>
                                </div>
                                <div className='col-sm-6'>
                                  <div className="form-outline mb-4">
                                    <select required className="form-select form-select-lg mb-3" onChange={(e) => setStock(e.target.value)}>
                                      <option value="" disabled>--Stock--</option>
                                      <option  value="In Stock">In Stock</option>
                                      <option value="Out Of Stock">Out Of Stock</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {/* 5th row */}
                              <div className='row'>
                                <div className='col-sm-12'>
                                  <div className="form-outline mb-4">
                                    <input type="text" className="form-control form-control-lg"
                                      value={image}
                                      placeholder='Product Image URL'
                                      onChange={(event) => setImage(event.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className='col-sm-12'>
                                  <div className="form-outline mb-4">
                                    <textarea className="form-control form-control-lg"
                                      value={description}
                                      placeholder='Description'
                                      onChange={(event) => setDescription(event.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>


                              <div>
                                {/* <p style={{ color: "red" }}>{msgg}</p> */}
                              </div>

                              <div className="d-flex justify-content-end pt-3">
                                <button type="button" className="btn btn-light btn-lg"
                                  onClick={() => {
                                    navigate('/viewProduct')
                                  }}>
                                  Cancel</button>
                                <button type="Submit" className="btn btn-primary btn-lg ms-2">Add Product</button>
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

      </div>
      <a className="backtotop" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div >
  </div >
</div >
    <Footer />
    </>
  )
}

export default AddProduct