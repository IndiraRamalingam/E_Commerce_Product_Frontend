import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../../services/instance';
import AdminNavBar from './AdminNavBar'
import Footer from '../Pages/Footer'

function ViewProduct() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const [alarm, setAlarm] = useState(false);

  useEffect(() => {
    getAllProducts()
  }, [alarm])

  const getAllProducts = async () => {
    try {
      const response = await instance.authInstance.get(`/admin/allProducts`);
      setProductData(response.data)
      //console.log(response.data)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

  const deleteProduct = async(id) =>{
    try{
        let response=await instance.protectedInstance.delete(`/admin/deleteProduct/${id}`)
        if(response.status==200)
        {
            setAlarm(true);
        }
    }
    catch(error)
    {
        console.log("Error in deleting doctor ", error)
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
                         <div style={{display:'inline','fontSize':'20px'}}>
                            <i data-star={e.rate}></i>
                            </div>
                         <span style={{ color: 'blue' }}> ({e.count} reviews) </span>
                       </div>
                       <div className='row'>
                         <div className='col-sm-6'>
                             <button className='btn btn-warning' onClick={() => {
                                               navigate(`/editProduct/${e._id}`)
                                            }}>
                             Edit <i class="fa fa-pencil" aria-hidden="true"></i>  
                           </button>
                         </div>
                         <div className='col-sm-6'>
                             <button className='btn btn-danger'  onClick={() => {
                                                deleteProduct(e._id);
                                            }}>
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