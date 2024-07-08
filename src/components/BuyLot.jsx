import React, { useState } from 'react';
import'../components/css/BuyLot.css';

function BuyLot({ contract , connectedAccount }) {
    const [lotId, setLotId] = useState('');
    const [lotValueEther, setLotValueEther] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const etherValue = parseFloat(lotValueEther);
        const weiValue = etherValue * 10**18;
        await contract.methods.buyLot(lotId).send({ from: connectedAccount , value: weiValue });
        alert('Lot purchased successfully!');
    };

    return (
        <form className="buy-lot-form" onSubmit={handleSubmit}>
            <h2>Buy Lot</h2>
            <input className="form-input" type="text" value={lotId} onChange={(e) => setLotId(e.target.value)} placeholder="Lot ID" />
            <input className="form-input" type="text" value={lotValueEther} onChange={(e) => setLotValueEther(e.target.value)} placeholder="Lot Value in Ether" />
            <button className="form-button" type="submit">Buy Lot</button>
        </form>
    );
}

export default BuyLot;
