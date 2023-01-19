import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { CryptoState } from '../CryptoContext'
import logo from "./Assets/logo.png"
import './Navbar.css'

const Navbar = () => {

    const { currency, setCurrency } = CryptoState();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home"><img src={logo} alt="logo" width="100px" height="48px" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto fs-5">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/news">News</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/blogs">Blogs</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-toggle" href="/products" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Products
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/products">Crypto Extensions</a></li>
                                    <li><a className="dropdown-item" href="/product">Financial Blogs</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/about">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/contact">Contact</a>
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