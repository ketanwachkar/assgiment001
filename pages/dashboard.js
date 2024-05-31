import Router from "next/router";
import { whoAmI } from "../lib/auth";
import { removeToken } from "../lib/token";
import React, { useState, useEffect } from "react";
import { add } from "../Redux/createSlice";
import { useDispatch, useSelector } from "react-redux";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { addProduct } from "../Redux/productSlice";



export default function Dashboard() {
  const [user, setUser] = useState({});
  // Watchers
  React.useEffect(() => {
    const token =
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token");
    if (!token) {
      redirectToLogin();
    } else {
      (async () => {
        try {
          const data = await whoAmI();
          if (data.error === "Unauthorized") {
            // User is unauthorized and there is no way to support the User, it should be redirected to the Login page and try to logIn again.
            redirectToLogin();
          } else {
            setUser(data);
          }
        } catch (error) {
          // If we receive any error, we should be redirected to the Login page
          redirectToLogin();
        }
      })();
    }
  }, []);

  function redirectToLogin() {
    Router.push("/auth/login");
  }

  function handleLogout(e) {
    e.preventDefault();

    removeToken();
    redirectToLogin();
  }
  // const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  const  products = useSelector((state) => state.Product)

  const getproducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    dispatch(addProduct(data));
    // setproducts(data);
  };

  const handleadd = (product) => {
    dispatch(add(product));
  };

  useEffect(() => {
    getproducts();
  }, []);
  if (user.hasOwnProperty("username")) {
    return (
      <>
      <Navbar user={user.username} handleLogout={handleLogout} />
        <nav
          className="navbar navbar-light"
          // style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="container-fluid">
          </div>
        </nav>
        <h3>{user.username} Profile</h3>
          <div className="productsWrapper">
            {products.map((product) => (
              <div key={product.id} className="card">
                <img src={product.image} alt="img" />
                <h6>{product.title}</h6>
                <h6>{product.price}</h6>
                <button className="btn" onClick={() => handleadd(product)}>
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        );
      </>
    );
  }
  return <div>Welcome back. Welcome to your empty profile.</div>;
}
