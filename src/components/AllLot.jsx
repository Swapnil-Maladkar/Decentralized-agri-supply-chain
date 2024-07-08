import React, { useEffect, useState } from 'react';
import "../components/css/LotList.css";

function LotList({ contract,connectedAccount }) {
    const [lots, setLots] = useState([]);

    useEffect(() => {
        const fetchLots = async () => {
            if(!contract){return}
            const lotCount = await contract.methods.lotCount().call();
            const lotPromises = [];
            for (let i = 1; i <= lotCount; i++) {
                lotPromises.push(contract.methods.lots(i).call());
            }
            const lotResults = await Promise.all(lotPromises);
            setLots(lotResults);
        };
        console.log(lots);
        fetchLots();
    }, [contract]);

    return (
        <div className="lot-list">
            <h2>All Lots</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Farmer ID</th>
                        <th>Crop Type</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Is Sold</th>
                        <th>Grade</th>
                        <th>Quality Test Report</th>
                    </tr>
                </thead>
                <tbody>
                    {lots.map((lot, index) => (
                        <tr key={index}>
                            <td>{lot.id.toString()}</td>
                            <td>{lot.farmerId.toString()}</td>
                            <td>{lot.cropType}</td>
                            <td>{lot.quantity.toString()}</td>
                            <td>{lot.location}</td>
                            <td>{lot.price.toString()}</td>
                            <td>{lot.isSold ? 'Yes' : 'No'}</td>
                            <td>{lot.grade}</td>
                            <td><a href={`https://ipfs.io/ipfs/${lot.imgURL}`} target="_blank" rel="noopener noreferrer">Link</a></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LotList;
