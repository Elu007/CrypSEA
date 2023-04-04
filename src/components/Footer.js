import React from 'react'
import fl from "./Assets/footerlogo.png"
import { Link } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="col">
          <Link className='text-decoration-none' to="/">  <img src={fl} width="340" height="100" alt="footerlogo" />
            <p className='text-center'>CrypSEA &copy; 2023</p></Link>
        </div>
        <div className="col">
          <div className="row">
            <h5>Company</h5>
            <Link className='nav-link active mx-3' to="/news">News</Link>
            <Link className='nav-link active mx-3' to="/product">Products</Link>
            <Link className='nav-link active mx-3' to="/about">About</Link>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <h5>Links</h5>
            <Link className='nav-link active mx-3' to="/">Home</Link>
            <Link className='nav-link active mx-3' to="/blogs">Blogs</Link>
            <Link className='nav-link active mx-3' to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="col">
          <h5>Socials</h5>
          <div className="row">
            <Link className='mb-1 text-black' to="https://github.com/Elu007" target="_blank" rel="noreferrer"><GitHubIcon/></Link>
            <Link className='mb-1' to="https://www.linkedin.com/in/sk-elaf-ahmed-bb85b0210/" target="_blank" rel="noreferrer"><LinkedInIcon/></Link>
            <Link className='mb-1' to="https://twitter.com/SkElafAhmed1?t=w7SjSiB8wBZ5Y-DJhiRMGA&s=35" target="_blank" rel="noreferrer"><TwitterIcon/></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
