import React from 'react';

const Circle = ({ onClick, color }) =>
    <div className="container--circle-icon" style={{ marginRight: 5 }} onClick={onClick}>
        <div style={{
            borderRadius: '50%',
            backgroundColor: color,
            height: 12,
            width: 12,
        }} />
    </div>;

export default Circle;