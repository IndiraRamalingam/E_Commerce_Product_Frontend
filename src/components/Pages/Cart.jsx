import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import instance from '../../services/instance';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Cart = () => {
    const { cartItems, totalAmount, quantity } = useSelector((state) => state.cart);
  
    const[id,setId]=useState('')
    const navigate=useNavigate();

    const fetchOrders = () =>{
        navigate(`/orderlist/${id}`)
    }
    
    async function getID(){
        const response = await instance.protectedInstance.get('/users/getId');
             const res=response.data;
             const params_id=res.user_ID;
             setId(params_id)
    }

      useEffect(() => {
        // fetchOrders({id}),
        getID()
      }, []);


    if (quantity === 0) {
      navigate('/error')
      
    }
  
    //Razorpay Payment Gateway Integration
    function loadRazorpay() {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
          alert('Razorpay SDK failed to load. Are you online?');
        };
        
        script.onload = async () => {
          try {
            //setLoading(true);
            const result = await instance.authInstance.post('payment/create-order', {
              amount: totalAmount + '00',
            });
            const { amount, id: order_id, currency } = result.data;
            const {
              data: { key: razorpayKey },
            } = await instance.authInstance.get('payment/get-razorpay-key');
    
            const options = {
              key: razorpayKey,
              amount: amount.toString(),
              currency: currency,
              name: 'example name',
              description: 'example transaction',
              order_id: order_id,
              handler: async function (response) {
                const result = await instance.authInstance.post('payment/pay-order', {
                  amount: amount,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                  userId:id,
                });
                console.log(id)
                alert(result.data.msg);
                navigate(`/orderlist/${id}`)
                fetchOrders();
                window.location.reload();
              },
              prefill: {
                name: 'example name',
                email: 'email@example.com',
                contact: '8025222223',
              },
              notes: {
                address: 'example address',
              },
              theme: {
                color: '#80c0f0',
              },
            };
    
           // setLoading(false);
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          } catch (err) {
            alert(err);
            // setLoading(false);
          }
        };
        document.body.appendChild(script);
      }

    return (
        <>
        <NavBar />
      <div className="Cart container">
        <h1 className="mt-4" style={{'textAlign':'center','color':'#764abc'}}>My Cart</h1>
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className='m-5' style={{'display':'grid','justifyContent':'center'}}>
        <h2 className="total">Total Amount: ₹{totalAmount.toFixed(2)}</h2>
        <button className="btn btn-warning btn-lg mb-5" onClick={loadRazorpay}>Proceed to buy</button>
        </div>
      </div>
        <Footer />
      </>
    );
  };

export default Cart;