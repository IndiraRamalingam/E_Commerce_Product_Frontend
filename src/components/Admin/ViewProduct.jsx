import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../../services/instance';
import AdminNavBar from './AdminNavBar'
import Footer from '../Pages/Footer'

function ViewProduct() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await instance.authInstance.get(`/admin/allProducts`);
      setProductData(response.data)
      console.log(response.data)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

  return (
    <>
    <AdminNavBar />

    <div className="row justify-content-center">
          {productData.map((e) => (
                   <div className="col-sm-3 m-5">
                   <div className="card border-warning h-100 text-center p-4" style={{width: "25rem"}}  key={e.id}>
                     <img src={e.image} className="card-img-top" alt={e.title} height="250px"/>
                     <div className="card-body">
                       <h5 className="card-title mb-0 mt-2 mb-2">{e.title.substring(0, 20)}...</h5>
                       <h6 className=" fst-italic" style={{ color: 'darkgoldenrod' }}>{e.Brand}</h6>
                       <p className="card-text fs-5 fw-bold" style={{ color: 'black' }}>
                         <span style={{ fontSize: "16px" }}>₹ </span>
                         {e.price}
                       </p>
                       <div className="rating mb-4">
                         <span>{e.rate} </span>
                         <i className="rating__star far fa-star"></i>
                         <i className="rating__star far fa-star"></i>
                         <i className="rating__star far fa-star"></i>
                         <i className="rating__star far fa-star"></i>
                         <i className="rating__star far fa-star"></i>
                         <span style={{ color: 'blue' }}> ({e.count} ratings) </span>
                       </div>
                       <div className='row'>
                         <div className='col-sm-6'>
                             <button className='btn btn-warning'>
                             Edit <i class="fa fa-pencil" aria-hidden="true"></i>  
                           </button>
                         </div>
                         <div className='col-sm-6'>
                             <button className='btn btn-danger'>
                             Delete <i class="fa fa-trash" aria-hidden="true"></i> 
                           </button>
                         </div>
                       </div>                       
                     </div>
                   </div>
                 </div>
          ))}
        </div>

    <Footer/>
    </>
  )
}

export default ViewProduct