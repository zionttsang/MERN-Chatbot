import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div style={{ display: 'flex', marginRight: 'auto', alignItems: 'center', gap: '8px' }}>
            <Link to='/'>
                <img src='../../assets/react.svg' alt='/logo' style={{ width: '50px', height: '50px' }} className='img-inverted' />
            </Link>
            <Typography>
                <span style={{ fontSize: '20px' }}>
                    TsangBot
                </span>-MERN
            </Typography>
        </div>
    )
}

export default Logo