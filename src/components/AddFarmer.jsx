import React, { useState } from 'react';
import "../components/css/AddFarmer.css"
// AddFarmer.js



function AddFarmer({ contract ,connectedAccount}) {
    const [addr, setAddr] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentFarmerCount = await contract.methods.farmerCount().call();
        await contract.methods.addFarmer(addr, name, location).send({ from: connectedAccount });
        const newFarmerId = parseInt(currentFarmerCount) + 1;
        console.log({connectedAccount})
        alert(`Farmer added successfully! Farmer ID: ${newFarmerId}`);
    };

    return (
        <form className="add-farmer-form" onSubmit={handleSubmit}>
            <h2>Add Farmer</h2>
            <input className="form-input" type="text" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Address" />
            <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input className="form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <button className="form-button" type="submit">Add Farmer</button>
        </form>
    );
}

export default AddFarmer;
