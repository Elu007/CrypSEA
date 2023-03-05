import React from 'react'
import about from './Assets/about.webp'
import profile from './Assets/profile.png'

const About = () => {
  return (
    <div className='container text-center'>
      <div className='d-flex justify-content-around mt-4 shadow-lg p-3 mb-5 bg-body rounded'>
        <img className='rounded-4' src={about} alt="about" />
        <div>
          <h1 className='mt-5'>About CrypSEA</h1>
          <p className='p-5 text-start'>We are developing a financial platform that will benefit cryptocurrency investors by being more fair, accessible, efficient, and transparent.
            <br />
            With the innovative notion that anybody, anywhere should be able to readily access, track, and acquire the accurate information about cryptocurrencies worldwide, so that they can easily make decisions about how and where to invest, we got began in 2023.</p>
        </div>
      </div>
      <hr style={{ border: "2px solid" }} />
      <div className='mt-3 shadow-lg p-3 mb-5 bg-body rounded'>
        <h1>Our Executive Team</h1>
        <div className='d-flex justify-content-around mt-4'>
          <div>
            <img className='p-3 rounded-5' src={profile} alt="profile" />
            <h1>Sk Elaf Ahmed</h1>
            <h5>Founder & CEO of CrypSEA</h5>
          </div>
          <div className='w-50' style={{marginTop:"25vh"}}>
            <p>
            As a software engineer, I adore creating online applications. Making investment social and accessible to everyone is my aim.
            <br/>
We shall succeed in our aim by working hard and with passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
