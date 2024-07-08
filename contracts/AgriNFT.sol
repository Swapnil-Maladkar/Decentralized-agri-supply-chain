// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgriNFT is ERC721, Ownable {
    struct Farmer {
        uint id;
        address addr;
        string name;
        string location;
    }

    struct Lot {
        uint id;
        uint farmerId;
        string cropType;
        uint quantity;
        string location;
        uint256 price;
        bool isSold;
        string grade;
        string imgURL;
    }

    struct Transportation {
        uint id;
        uint lotId;
        address transporter;
        string transportDetails;
    }

    mapping(uint => Farmer) public farmers;
    mapping(uint => Lot) public lots;
    mapping(uint => Transportation) public transportations;
    uint public farmerCount;
    uint public lotCount;
    uint public transportationCount;

   constructor() ERC721("AgricultureNFT", "AGNFT") Ownable(msg.sender) {}

    function addFarmer(address _addr, string memory _name, string memory _location) public onlyOwner {
        farmerCount++;
        farmers[farmerCount] = Farmer(farmerCount, _addr, _name, _location);
    }

    function addLot(uint _farmerId, string memory _cropType, uint _quantity, string memory _location, uint256 _price, string memory _grade,string memory _imgURL) public {
        require(_farmerId > 0 && _farmerId <= farmerCount, "Invalid farmer ID");
        require(farmers[_farmerId].addr == msg.sender, "Only the farmer can add their lot");
        lotCount++;
        lots[lotCount] = Lot(lotCount, _farmerId, _cropType, _quantity, _location, _price, false, _grade,_imgURL);
    }

function addTransportation(uint _lotId, address _transporter, string memory _transportDetails) public {
        require(lots[_lotId].id != 0, "Lot does not exist");
        require(lots[_lotId].isSold, "Lot is not sold yet");
        require(farmers[lots[_lotId].farmerId].addr == msg.sender, "Only the farmer can add transportation details");

        transportationCount++;
        transportations[transportationCount] = Transportation(transportationCount, _lotId, _transporter, _transportDetails);
    }

    function buyLot(uint _lotId) public payable {
        require(lots[_lotId].id != 0, "Lot does not exist");
        require(msg.value >= lots[_lotId].price, "Insufficient funds");
        require(!lots[_lotId].isSold, "Lot already sold");

        Lot storage lot = lots[_lotId];
        lot.isSold = true;
        _safeMint(msg.sender, _lotId);

        // Transfer the funds to the farmer
        address farmerAddr = farmers[lot.farmerId].addr;
        payable(farmerAddr).transfer(msg.value);
    }

    function getLot(uint _lotId) public view returns (uint, uint, string memory, uint, string memory, uint256, bool, string memory) {
        Lot memory lot = lots[_lotId];
        return (lot.id, lot.farmerId, lot.cropType, lot.quantity, lot.location, lot.price, lot.isSold, lot.grade);
    }

    function getTransportation(uint _transportationId) public view returns (uint, uint, address, string memory) {
        Transportation memory transportation = transportations[_transportationId];
        return (transportation.id, transportation.lotId, transportation.transporter, transportation.transportDetails);
    }

    function getAllLots() public view returns (Lot[] memory) {
        Lot[] memory allLots = new Lot[](lotCount);
        for (uint i = 1; i <= lotCount; i++) {
            allLots[i - 1] = lots[i];
        }
        return allLots;
    }
}