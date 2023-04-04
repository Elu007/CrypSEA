import React from 'react'
import { Link } from 'react-router-dom'
import gif from "./Assets/cryptoGif.gif"

const Product = () => {
  return (
    <div className='container text-center'>
      <h1>Our Products</h1>
      <div className='row mt-4 shadow-lg p-3 mb-5 bg-body rounded'>
        <div className="col-md-4">
          <h3>Crypto Price Tracker Extensions</h3>
          <p className='mt-5'>With the help of our price tracker extension, you can effortlessly keep tabs on your preferred crypto currencies. You can track them all in one location by clicking on the extension instead of having to browse many websites. The demo is depicted in the gif.</p>
          <Link className='btn btn-primary mt-4' to="/contact">Order Now</Link>
        </div>
        <div className="col">
          <img className='img-fluid rounded' src={gif} alt="gif" />
        </div>
      </div>
      <div className='row mt-4 shadow-lg p-3 mb-5 bg-body rounded'>
        <div className="col-md-4">
          <h3>Blogs</h3>
          <p>Our website is among the best financial websites. You can find a wide range of articles and resources on personal finance, investing, and business news to help you make informed financial decisions.</p>
        </div>
        <div className="col">
            <h3>Click The Link Below</h3>
            <Link className='btn btn-primary btn-lg mt-2' to="/blogs">Blogs</Link>
        </div>
      </div>
    </div>
  )
}

export default Product
