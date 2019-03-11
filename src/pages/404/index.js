import React from 'react';
import { Link } from 'react-router-dom';

const FourOhFour = () => <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    fontSize: 20,
}}>
    <div style={{
        fontWeight: 500,
        color: '#989797',
        marginBottom: 20,
        marginTop: -50,
    }}>404 Page Not Found</div>
    <Link style={{ color: '#ffc400' }} to="/">Home</Link>
</div>

export default FourOhFour;