import React from 'react'
import crypto1 from './Assets/crypto1.jpg'
import crypto2 from './Assets/crypto2.webp'
import compounding from './Assets/compounding.jpg'
import website from './Assets/website.jpg'


const Blog = () => {
    return (
        <div className='container'>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={crypto1} className="d-block w-100" alt="crypto1" style={{height:"85vh"}}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h1 className='text-white'>Crypto Currency- Start Investing</h1>
                                <a className='btn btn-light btn-lg' href="https://investingwithelu.blogspot.com/2021/06/crypto-currency-and-how-to-invest-in.html" target="_blank" rel="noreferrer" role="button">Read More</a>
                            </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={crypto2} className="d-block w-100" alt="crypto2" style={{height:"85vh"}}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h1 className='text-white bg-dark'>Buy Your First Crypto</h1>
                                <a className='btn btn-light btn-lg' href="https://investingwithelu.blogspot.com/2022/05/crypto-currency-is-it-right-time-to-buy.html" target="_blank" rel="noreferrer" role="button">Read More</a>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={compounding} className="d-block w-100" alt="Compounding" style={{height:"85vh"}}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h1>Power Of Compounding</h1>
                                <a className='btn btn-light btn-lg' href="https://investingwithelu.blogspot.com/2021/09/the-unfair-advantage-power-of.html" target="_blank" rel="noreferrer" role="button">Read More</a>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='text-center m-5'>
                <h1>Learn With Blogs</h1>
                <p>New to Finance? Start Investing With Proper Financial Knowledge - with our easy to understand blogs</p>
                <img src={website} className="d-block w-100" alt="website"/>
                <h3 className='mt-5'>Click below and check out our latest financial blogs...</h3>
                <a class="btn btn-primary btn-lg mt-3" href="https://investingwithelu.blogspot.com/" target="_blank" rel="noreferrer" role="button">View More</a>
            </div>
        </div>
    )
}

export default Blog
