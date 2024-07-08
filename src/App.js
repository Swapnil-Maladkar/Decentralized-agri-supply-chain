
import AddFarmer from "./components/AddFarmer.jsx";
import AddLot from "./components/AddLot.jsx";
import BuyLot from "./components/BuyLot.jsx";
import LotDetails from "./components/LotDetails.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddTransportation from "./components/AddTransportation.jsx";
import AgriNFT from "./AgriNFT.json";
import './App.css';
import LotList from "./components/AllLot.jsx";

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { Contract } from 'web3-eth-contract';





function App() {

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState('');
  
  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.eth_requestAccounts;
          console.log('Connected to MetaMask');
          setWeb3(web3Instance);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = AgriNFT.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            AgriNFT.abi,
            "0xE273C5A208aB80b7f882C24B306008D5798f4020" //contract address
          );
          setContract(contractInstance);
          const accounts = await web3Instance.eth.getAccounts();
          setConnectedAccount(accounts[0]);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    connectToMetaMask();
  }, []);
  console.log({connectedAccount} )
  return (
  <>
  <div className="back">

    <h2>Connected Account:{connectedAccount} </h2>
    
    <Router>
      <div className="btn-grp">
        <Link to="/addfarmer"><button className='btn'>Go to Farmer</button></Link>
        <Link to="/addlot"><button className='btn'>Go to Add Lot</button></Link>
        <Link to="/buylot"><button className='btn'>Go to Buy Lot</button></Link>
        {/* <Link to="/lotdetails"><button className='btn'>Get Lot Details</button></Link> */}
        <Link to="/alllot"><button className='btn'>Get All Lots</button></Link>
        <Link to="/addtransportation"><button className='btn'>Go to Add Transportation</button></Link>
      </div>

      <Routes>
        <Route path="/addfarmer" element={<AddFarmer contract={contract} connectedAccount={connectedAccount} />} />
        <Route path="/addlot" element={<AddLot contract={contract} connectedAccount={connectedAccount} />} />
        <Route path="/buylot" element={<BuyLot contract={contract} connectedAccount={connectedAccount}/>} />
        <Route path="/addtransportation" element={<AddTransportation contract={contract} connectedAccount={connectedAccount} />} />
        {/* <Route path="/lotdetails" element={<LotDetails contract={contract} connectedAccount={connectedAccount}/>} /> */}
        <Route path="/alllot" element={<LotList contract={contract} connectedAccount={connectedAccount}/>} />
      </Routes>


    </Router>
  </div>
  </>
  );
}

export default App;
