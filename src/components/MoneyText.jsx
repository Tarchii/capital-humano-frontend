import React from 'react';

const MoneyText = ({ children }) => {
    return <div style={{ textAlign: 'right' }}>${children}</div>
}

export default MoneyText;