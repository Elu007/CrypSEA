import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { CryptoState } from '../CryptoContext'
import { Link } from 'react-router-dom'
import logo from "./Assets/logo.svg"
import './Navbar.css'

const Navbar = () => {

    const { currency, setCurrency } = CryptoState();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home"><img src={logo} alt="logo" width="100px" height="58px" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto fs-5">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/news">News</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link active dropdown-toggle" to="/product" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Products
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/product">Crypto Extensions</Link></li>
                                    <li><Link className="dropdown-item" to="/product">Financial Blogs</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Select variant='outlined' value={currency} onChange={(e) => setCurrency(e.target.value)} style={{width:100, height: 40, marginRight: 15}}>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
            </nav>
        </div>
    )
}

export default Navbar