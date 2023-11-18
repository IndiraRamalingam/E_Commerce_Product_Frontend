import React from 'react'
import instance from '../../services/instance';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';

function OrderList() {

    const [orders, setOrders] = useState([]);
    const [id, setId] = useState('')
    const navigate = useNavigate();

    const fetchOrders = async ({ id }) => {
        const response = await instance.authInstance.get(`payment/list-orders/${id}`);
        const res = response.data;
       // console.log("REWCSD  " + res)
        setOrders(res);
    }

    async function getID() {
        const response = await instance.protectedInstance.get('/users/getId');
        const res = response.data;
        const params_id = res.user_ID;
        //console.log(params_id)
        setId(params_id)
    }

    useEffect(() => {
        fetchOrders({ id }),
            getID()
    }, [id]);

    return (
        <>
        <NavBar />
        <div>
            <div className="list-orders">
                <h3 className="m-4 text-uppercase" style={{ color: "#0d6efd", 'fontWeight': 'bolder', 'textAlign': 'center', 'fontStyle': 'italic' }}>LIST OF ORDERS</h3>
                <div className='table-responsive-lg'>
                    <table className='table table-hover' style={{ 'textAlign': 'center' }}>
                        <thead>
                            <tr className='table-warning'>
                                <th>ORDER ID</th>
                                <th>RAZORPAY ID</th>
                                <th>AMOUNT</th>
                                <th>ISPAID</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((x) => (
                                <tr className='table-light' key={x._id}>
                                    <td>{x._id}</td>
                                    <td>{x.razorpay.paymentId}</td>
                                    <td>₹ {x.amount / 100}</td>
                                    <td>{x.isPaid ? 'YES' : 'NO'}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
        <div  style={{'display':'grid','justifyContent':'center'}} >
            <button className='btn btn-warning m-2' onClick={() => {
                 navigate(`/`)
                window.location.reload();
               
            }}>Close</button>
        </div>
        </div>
        <Footer />
        </>
    )
}

export default OrderList