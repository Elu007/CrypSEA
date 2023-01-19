import React from 'react'
import Navbar from './Navbar'
import CoinsTable from './CoinsTable'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
                <CoinsTable />
            </div>
        </>
    )
}

export default Home