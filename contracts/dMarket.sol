// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
//0xe750c5EBA24D2aadfFf7840997E9947c470c4062 -old deployed address
// 0x16adc5b4CDA6016ad862dE57540C38DC08D704c2 --recent old address
// 0x2eA1d464a15b6d4EFF0e6656ca7B9Af85f49C097

// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";
import 'base64-sol/base64.sol';

contract dMarket is ERC721URIStorage {
    uint256 tokenId = 1;
    address payable public owner;
    uint256 listingPrice = 0.00 ether;

    struct NFT {
        uint256 tokenId;        
        address payable owner;
        bool isForSale;
        bool isSoulbound;
        // warranty to be stored in mongodb
    }
    event CreateNFT(
        uint256 indexed _tokenId,
        string _tokenURI,
        address indexed _owner,
        uint256 transfers,
        address issuer,
        uint256 order_serial_number,
        string issue_time,
        string duration,
        string description,
        string name,
        string rarity
    );
    event TransferNFT(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );
    event BuyNFT(
        address indexed _buyer,
        uint256 indexed _tokenId
    );
    mapping(uint256 => NFT) public nfts;

    constructor() ERC721("dMarket", "DMKT") {
        owner = payable(msg.sender);
    }

    function createNFT(string memory _tokenURI, uint256 _transfers,string memory _issueTime ,string memory _duration,uint256 _serialNo,address _issuer,bool isSoulbound,string memory name,string memory description,string memory _rarity) public payable returns(uint256) {
        require(msg.value == listingPrice, "You must pay the listing price");
        nfts[tokenId] = NFT(tokenId, payable(msg.sender), false,isSoulbound);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, formatTokenURI(_tokenURI,description,name,_serialNo,_rarity));
        
        owner.transfer(msg.value);
        tokenId++;
        emit CreateNFT(tokenId - 1, _tokenURI, msg.sender, _transfers,_issuer,_serialNo,_issueTime,_duration,description,name,_rarity);
        return tokenId-1;
    }

    // function buyNFT(uint256 _tokenId) public payable {
    //     require(_exists(_tokenId), "NFT does not exist");
    //     require(nfts[_tokenId].isForSale, "NFT is not for sale");
    //     // require(
    //     //     msg.value == nfts[_tokenId].price,
    //     //     "Price must be equal to the price of the token"
    //     // );
    //     require(
    //         nfts[_tokenId].owner != msg.sender,
    //         "You can not buy your own NFT.!"
    //     );
    //     _transfer(nfts[_tokenId].owner, msg.sender, _tokenId);
    //     nfts[_tokenId].owner.transfer(msg.value);
    //     nfts[_tokenId].owner = payable(msg.sender);
    //     nfts[_tokenId].isForSale = false;
    //     emit BuyNFT(msg.sender, _tokenId);
    // }

    // function markNFTForSale(uint256 _tokenId) public {
    //     require(_exists(_tokenId), "NFT does not exist");
    //     require(
    //         nfts[_tokenId].owner == msg.sender,
    //         "You can not mark others NFT for sale.!"
    //     );
    //     nfts[_tokenId].isForSale = true;
    // }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override virtual {
        if(nfts[tokenId].isSoulbound){
            require(from==address(0) || to ==address(0),"It cannot be transfered");
        }
    }




    function transferNFT(address _to, uint256 _tokenId) public {
        require(
            nfts[_tokenId].owner == msg.sender,
            "NFT does not exists or you dont have permission to transfer.!"
        );
        safeTransferFrom(nfts[_tokenId].owner, _to, _tokenId);
        nfts[_tokenId].owner = payable(_to);
        emit TransferNFT(msg.sender, _to, _tokenId);
    }

    
    
  

    function getNFTMetaData(uint256 _tokenId) public view returns( uint256 _price,address _owner ,bool forSale,bool soulBound) {
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

    // uint256 tokenId;        
    //     address payable owner;
    //     bool isForSale;
    //     bool isSoulbound;
        return (nfts[_tokenId].tokenId,nfts[_tokenId].owner,nfts[_tokenId].isForSale,nfts[_tokenId].isSoulbound);
    }

    function getNFTCount() public view returns (uint256) {
        return tokenId - 1;
    }
    // _tokenURI,description,name,_transfers,_issueTime,_duration,_serialNo
    function formatTokenURI(string memory _tokenURI,string memory description,string memory name,uint256 _serialNo,string memory _rarity)  public pure  returns(string memory){
        return string(
            abi.encodePacked('data:application/json,',
                bytes(
                    abi.encodePacked(
                         '{"name":"',name,'", "description":"',description,'", "attributes":[{"trait_type": "serial_no","value":"',Strings.toString(_serialNo) ,'"},{"trait_type": "Rarity","value":"',_rarity ,'"}], "image":"',_tokenURI,'"}'
                    )
                )
            )
        );
    }
    
}
