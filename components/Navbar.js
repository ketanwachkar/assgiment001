"use client";
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../Redux/productSlice';

const Navbar = ({user, handleLogout }) => {
    const item = useSelector((state)=>state.cart)
    const Product = useSelector((state)=>state.Product)
    const dispatch = useDispatch()

    const getproducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(addProduct(data));
    };
    const handleSearch = async (e) => {
      if(e == ""){
        await getproducts()
        return;
      }
      const filteredData = Product.filter((item) =>  item.title.toLowerCase().includes(e.toLowerCase()))
      dispatch(addProduct(filteredData))
    }
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between", height:"60px"}}>
         <h4>Welcome: {user}</h4>
         <div>
          <input style={{ borderRadius:"5px"}} placeholder='Search...' onChange={(e) => handleSearch(e.target.value)}></input>
            <Link className='navLink' style={{fontWeight:"bolder"}} href={"/"}>Home</Link>
            <Link className='navLink' style={{fontWeight:"bolder",marginRight:"7px"}} href={"/cart"}>Cart items:</Link>
            <span style={{fontWeight:"bolder"}}>{item.length}</span>
            <button
              className="btn btn-info"
              type="button"
              style={{ color: "white", marginLeft:"1rem", backgroundColor: "#0d6efd" }}
              onClick={handleLogout}
            >
              Logout
            </button>
         </div>
    </div>
  )
}

export default Navbar