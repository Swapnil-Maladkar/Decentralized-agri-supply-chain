import React, { useState } from 'react';
import '../components/css/LotDetails.css';

function LotDetails({ contract }) {
    const [lotId, setLotId] = useState('');
    const [lot, setLot] = useState(null);

    const fetchLot = async () => {
        if (!contract || !lotId) return;
        const result = await contract.methods.getLot(lotId).call();
        setLot(result);
    };

    const handleInputChange = (e) => {
        setLotId(e.target.value);
    };

    const handleFetchLot = () => {
        fetchLot();
    };

    return (
        <div className="lot-details-container">
            <div className="lot-details-card">
                <div className="lot-details-input-container">
                    <input
                        className="lot-details-input"
                        type="text"
                        placeholder="Enter Lot ID"
                        value={lotId}
                        onChange={handleInputChange}
                    />
                    <button className="lot-details-button" onClick={handleFetchLot}>Fetch Lot Details</button>
                </div>
                {lot && (
                    <div className="lot-details-details">
                        <p>Lot ID: {lot[0].toString()}</p>
                        <p>Farmer ID: {lot[1].toString()}</p>
                        <p>Crop Type: {lot[2]}</p>
                        <p>Quantity: {lot[3].toString()}</p>
                        <p>Location: {lot[4]}</p>
                        <p>Price: {lot[5].toString()}</p>
                        <p>Is Sold: {lot[6].toString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LotDetails;
