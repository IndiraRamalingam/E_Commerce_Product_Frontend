import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../../services/instance';
import Product from './Product';
import Footer from './Footer';
import NavBar from './NavBar';

function Products() {

  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState(productData);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await instance.authInstance.get(`/product/all_products`);
      setProductData(response.data)
      setFilterData(response.data)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }


  //To filter products based on Category onclick value
  const filterProductByCategory = (value) => {
    const updatedList = productData.filter((x) => x.category === value);
    // console.log(updatedList)
    setFilterData(updatedList);
  }

  //To filter products based on search box value
  const filterProductBySearchBox = (value) => {
    const updatedSearchBox = productData.filter((x) => {
      return x.title.toLowerCase().includes(value.toLowerCase()) || x.description.toLowerCase().includes(value.toLowerCase()) || x.Brand.toLowerCase().includes(value.toLowerCase())
    })
    // console.log(updatedSearchBox)
    setFilterData(updatedSearchBox);
  }

  const filterByPrice = (x,y) => {
    const updatedSearchBox = productData.filter((e) => {
      if(e.price > x && e.price <y)
      {
        return e;
      }
    })
    setFilterData(updatedSearchBox);
  }
  
  //Filter products based on Rating and limit upto 7 only
  const filterByRating = async () => {
    try {
      const response = await instance.authInstance.get(`/product/sort_productsByRating`);
      // console.log(response.data.allTransaction)
      setFilterData(response.data.allTransaction)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

  //Filter products based on sorting A to Z
  const filterProductByNameA = async () => {
    try {
      const response = await instance.authInstance.get(`/product/sort_productsByA_Z`);
      // console.log(response.data.allTransaction)
      setFilterData(response.data.allTransaction)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

  //Filter products based on sorting Z to A
  const filterProductByNameZ = async () => {
    try {
      const response = await instance.authInstance.get(`/product/sort_productsByZ_A`);
      // console.log(response.data.allTransaction)
      setFilterData(response.data.allTransaction)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

  //Filter products based on Price Low to High
  const filterProductByPriceLow = async () => {
    try {
      const response = await instance.authInstance.get(`/product/sort_productsByPriceLow`);
      // console.log(response.data.allTransaction)
      setFilterData(response.data.allTransaction)
    }
    catch (error) {
      console.log("Error in fetching Data ", error)
    }
  }

    //Filter products based on Price Low to High
    const filterProductByPriceHigh = async () => {
      try {
        const response = await instance.authInstance.get(`/product/sort_productsByPriceHigh`);
        // console.log(response.data.allTransaction)
        setFilterData(response.data.allTransaction)
      }
      catch (error) {
        console.log("Error in fetching Data ", error)
      }
    }

  //For Category
  const function_category = () => {
    var x = document.getElementById("category_id");
    var y = document.getElementById("sort_id");
    var z=document.getElementById("price_id")
    if (x.style.display === "none") {
      y.style.display = "none";
      z.style.display = "none";
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  // For Sort
  const function_sort = () => {
    var y = document.getElementById("sort_id");
    var x = document.getElementById("category_id");
    var z=document.getElementById("price_id")
    if (y.style.display === "none") {
      x.style.display = "none";
      z.style.display = "none";
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
  }
    // For Price
    const function_price = () => {
      var y = document.getElementById("sort_id");
      var x = document.getElementById("category_id");
      var z=document.getElementById("price_id")
      if (z.style.display === "none") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
      } else {
        z.style.display = "none";
      }
    }

  return (
    <>
    <NavBar />
      {/* For Search bar */}
      <div className='contianer m-5'>
        <div className='row g-4'>
          <div className='col-sm-2'></div>
          {/* Search bar for title */}
          <div className='col-sm-8 mb-3' style={{ 'display': 'flex' }}>
            <input type="text" className="form-control form-control-lg"
              //  value={word}
              placeholder='Search by Product Name, Brand or Description...'
              onChange={(e) => filterProductBySearchBox(e.target.value)}
            />
            <button className='btn btn-lg btn-primary' ><i class="fa fa-search"></i></button>

          </div>
          <div className='col-sm-2'></div>
        </div>

        {/* Button Group */}

        <div className='row g-4'>
          <div className="d-flex" style={{ textAlign: 'center' }}>
            <div className='col-sm-3'></div>
            <div className='col-sm-2' ><button className='btn btnproduct1 m-3' style={{ paddingLeft: '25px', paddingRight: '25px' }} onClick={function_category}> <i class="fa fa-th-large" aria-hidden="true"></i> Categories</button></div>
            <div className='col-sm-2'><button className='btn btnproduct1 m-3' style={{ paddingLeft: '25px', paddingRight: '25px' }} onClick={function_sort}>Sort By <i class="fa fa-chevron-down" aria-hidden="true"></i></button></div>
            <div className='col-sm-2'><button className=' btn btnproduct1 m-3' style={{ paddingLeft: '25px', paddingRight: '25px' }} onClick={function_price}>Price <i class="fa fa-chevron-down" aria-hidden="true"></i></button></div>
            <div className='col-sm-3'></div>
          </div>
        </div>

        {/* For Category */}
        <div className='row g-4' id='category_id' style={{ display: 'none' }}>
          <div className=" mt-5">
            <button className='col-sm-2 btn btnproduct m-3' onClick={() => setFilterData(productData)}>All</button>
            <button className=' col-sm-2 btn btnproduct m-3 ' onClick={() => filterProductByCategory("Men's clothing")}>Men's Clothing</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterProductByCategory("Electronics")}>Electronics</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterProductByCategory("Women's clothing")}>Women's Clothing</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterProductByCategory("Jewelery")}>Jewellery</button>
          </div>
        </div>

        {/* For Sort */}
        <div className='row g-4' id='sort_id' style={{ display: 'none' }}>
          <div className=" mt-5">
            <button className='col-sm-2 btn btnproduct m-3' onClick={() => filterByRating()}>Best Seller: Rating</button>
            <button className=' col-sm-2 btn btnproduct m-3 ' onClick={() => filterProductByPriceLow()}>Price: Low To High</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterProductByPriceHigh()}>Price: High To Low</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterProductByNameA()}>Name: A To Z</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterProductByNameZ()}>Name: Z To A</button>
          </div>
        </div>

         {/* For Price */}
         <div className='row g-4' id='price_id' style={{ display: 'none' }}>
          <div className=" mt-5">
          <button className='col-sm-2 btn btnproduct m-3' onClick={() => filterByPrice(0,1000)}>₹ 0-1000</button>
            <button className='col-sm-2 btn btnproduct m-3' onClick={() => filterByPrice(1001,1500)}>₹ 1001-1500</button>
            <button className=' col-sm-2 btn btnproduct m-3 ' onClick={() => filterByPrice(1500,2000)}>₹ 1500-2000</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterByPrice(2000,3000)}>₹ 2000-3000</button>
            <button className=' col-sm-2 btn btnproduct m-3' onClick={() => filterByPrice(3000,10000000)}>₹ 3000-above</button>
          </div>
        </div>

        {/* Filtered Data to display in card */}
        <div className="row justify-content-center">
          {filterData.map((e) => (
            <Product key={e.id} {...e} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products