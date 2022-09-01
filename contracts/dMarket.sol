// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
//0xe750c5EBA24D2aadfFf7840997E9947c470c4062 -old deployed address
// 0x16adc5b4CDA6016ad862dE57540C38DC08D704c2 --recent old address

// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";
import 'base64-sol/base64.sol';

contract dMarket is ERC721URIStorage {
    uint256 tokenId = 1;
    address payable public owner;
    uint256 listingPrice = 0.00 ether;

    struct NFT {
        uint256 tokenId;
        uint256 transfers;
        address payable owner;
        bool isForSale;

        address issuer;
        uint256 order_serial_number;
        string issue_time;
        string duration;
        bool isSoulbound;
        // warranty to be stored in mongodb
    }
    event CreateNFT(
        uint256 indexed _tokenId,
        string _tokenURI,
        address indexed _owner,
        uint256 _price
    );
    event TransferNFT(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );
    event BuyNFT(
        address indexed _buyer,
        uint256 indexed _tokenId,
        uint256 _price
    );
    mapping(uint256 => NFT) public nfts;

    constructor() ERC721("dMarket", "DMKT") {
        owner = payable(msg.sender);
    }

    function createNFT(string memory _tokenURI, uint256 _transfers,string memory _issueTime ,string memory _duration,uint256 _serialNo,address _issuer,bool isSoulbound) public payable {
        require(msg.value == listingPrice, "You must pay the listing price");
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, formatTokenURI(_tokenURI));
        nfts[tokenId] = NFT(tokenId, _transfers, payable(msg.sender), false,_issuer,_serialNo,_issueTime,_duration,isSoulbound);
        owner.transfer(msg.value);
        tokenId++;
        emit CreateNFT(tokenId - 1, _tokenURI, msg.sender, _transfers);
    }

    function buyNFT(uint256 _tokenId) public payable {
        require(_exists(_tokenId), "NFT does not exist");
        require(nfts[_tokenId].isForSale, "NFT is not for sale");
        // require(
        //     msg.value == nfts[_tokenId].price,
        //     "Price must be equal to the price of the token"
        // );
        require(
            nfts[_tokenId].owner != msg.sender,
            "You can not buy your own NFT.!"
        );
        _transfer(nfts[_tokenId].owner, msg.sender, _tokenId);
        nfts[_tokenId].owner.transfer(msg.value);
        nfts[_tokenId].owner = payable(msg.sender);
        nfts[_tokenId].isForSale = false;
        emit BuyNFT(msg.sender, _tokenId, nfts[_tokenId].transfers);
    }

    function markNFTForSale(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "NFT does not exist");
        require(
            nfts[_tokenId].owner == msg.sender,
            "You can not mark others NFT for sale.!"
        );
        nfts[_tokenId].transfers = _price;
        nfts[_tokenId].isForSale = true;
    }


    function transferNFT(address _to, uint256 _tokenId) public {
        require(
            nfts[_tokenId].owner == msg.sender,
            "NFT does not exists or you dont have permission to transfer.!"
        );
        _transfer(nfts[_tokenId].owner, _to, _tokenId);
        nfts[_tokenId].owner = payable(_to);
        emit TransferNFT(msg.sender, _to, _tokenId);
    }
    
  

    function getNFTMetaData(uint256 _tokenId) public view returns( uint256 _price,string memory _issueTime ,string memory _duration,uint256 _serialNo,address _issuer) {
    //     struct NFT {
    //     uint256 tokenId;
    //     uint256 price;
    //     address payable owner;
    //     bool isForSale;

    //     address issuer;
    //     uint256 order_serial_number;
    //     string issue_time;
    //     uint256 duration;
    //     // warranty to be stored in mongodb
    // }
        return (nfts[_tokenId].transfers,nfts[_tokenId].issue_time,nfts[_tokenId].duration,nfts[_tokenId].order_serial_number,nfts[_tokenId].issuer);
    }

    function getNFTCount() public view returns (uint256) {
        return tokenId - 1;
    }

    function formatTokenURI(string memory _tokenURI)  public pure  returns(string memory){
        return string(
            abi.encodePacked('data:application/json,',
                bytes(
                    abi.encodePacked(
                         '{"name":"',
                                "SVG NFT 22", // You can add whatever name here
                                '", "description":"An NFT based on SVG!", "attributes":"", "image":"',_tokenURI,'"}'
                    )
                )
            )
        );
    }
    
}
