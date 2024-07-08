// AddLot.js
import React, { useState } from 'react';
import '../components/css/AddLot.css';
import {create} from 'ipfs-http-client';

const ipfs = create({
    url: 'http://127.0.0.1:5001',
  });

function AddLot({ contract , connectedAccount }) {
    const [farmerId, setFarmerId] = useState('');
    const [cropType, setCropType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [grade, setGrade] = useState('');

    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!file) {
          alert('Please select a file first!');
          return;
        }
    
        try {
          const added = await ipfs.add(file);
          alert('File Uploaded Successfully');
          setResult(added.path);
          console.log(added.path);

        } catch (error) {
          console.error('Error uploading file:', error);
          setResult('Failed to upload file');
        }
      };     

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gasPrice = '10000000000';
        await contract.methods.addLot(farmerId, cropType, quantity, location, price, grade, result).send({ from: connectedAccount ,gasPrice });
        alert('Lot added successfully!');
    };

    return (
        <form className="add-lot-form" onSubmit={handleSubmit}>
      <h2>Add Lot</h2>
      <input
        className="form-input"
        type="text"
        value={farmerId}
        onChange={(e) => setFarmerId(e.target.value)}
        placeholder="Farmer ID"
      />
      <input
        className="form-input"
        type="text"
        value={cropType}
        onChange={(e) => setCropType(e.target.value)}
        placeholder="Crop Type"
      />
      <input
        className="form-input"
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <input
        className="form-input"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        className="form-input"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        className="form-input"
        type="text"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        placeholder="Grade"
      />
      {/* File Upload Section */}
      <div>
        <label>Upload Test Report : </label>
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <button type="button" id="uploadButton" onClick={uploadImage}>
          Upload Image
        </button>
      </div>
      {/* End of File Upload Section */}
      <button className="form-button" type="submit">
        Add Lot
      </button>
    </form>
 
    );
}

export default AddLot;