// AddTransportation.js
import React, { useState } from 'react';
import '../components/css/AddTransportation.css';

function AddTransportation({ contract , connectedAccount}) {
    const [lotId, setLotId] = useState('');
    const [transporter, setTransporter] = useState('');
    const [transportDetails, setTransportDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await contract.methods.addTransportation(lotId, transporter, transportDetails).send({ from: connectedAccount});
        alert('Transportation details added successfully!');
    };

    return (
        <form className="add-transportation-form" onSubmit={handleSubmit}>
            <h2>Add Transportation</h2>
            <input className="form-input" type="text" value={lotId} onChange={(e) => setLotId(e.target.value)} placeholder="Lot ID" />
            <input className="form-input" type="text" value={transporter} onChange={(e) => setTransporter(e.target.value)} placeholder="Transporter Address" />
            <input className="form-input" type="text" value={transportDetails} onChange={(e) => setTransportDetails(e.target.value)} placeholder="Transport Details" />
            <button className="form-button" type="submit">Add Transportation</button>
        </form>
    );
}

export default AddTransportation;
