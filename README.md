# ECommerce warranty system using NFTs
#### Submitted as a solution for Flipkart Grid 4.0 Software Development Challenge

<div align="center">
<img align="center" src="https://i.postimg.cc/qvRtwLnt/Cap1.png" width="700">
</div>
<br>
The objective is to replace the physical warranty and have block chain based warranty using NFT which will ensure
authenticity and security

Many consumer products such as Electronics,furniture,etc brought on Eccomerce websites come with basic warranties. But there are also issued warranties against manufacturing and regular-use defects. Warranties are only granted when sold through an authorized dealer or store and oftentimes are valid only for a specified time.

Currently, the validity of the warranty is determined by some physical receipt or warranty card. This poses several issues:

* The warranty document is easily falsifiable.
* The warranty document is not necessarily standard among different sellers.
* A bad acting authorized dealer could issue warranty cards for expired products "under the table".

### Objectives :

1. The blockchain smart contract should allow users to prove ownership
2. Provide the purchasing history, warranty period, and other item information
3. The warranty card should include the item’s serial number and upon purchase be sent to the customer’s smartphone.
4. The NFTs should be decaying in nature, in that, after a certain period their use for the redemption of warranty benefits offered by the brand/retailer will expire
5. GUI-based tool that doesn’t require knowledge of any Blockchain programming to use by Brands and Retailers.
6. Usage of Soulbound NFTs
7. Add any engagement/gamification construct to the loyalty program

### Documentation :
Please Find the documentation, use cases,limitations and future scope for our project <a href="https://github.com/vaishnavi-vsp/Flipkart-Unstop/blob/master/BitLords_Blockchain_MetaCommerce.pdf">here</a>

### Proposed Solution 
The issues mentioned above are all byproducts of maintaining warranties in the physical world. Tokenize the warranties and many of the problems related to the "real-world" disappear. Not only are the problems resolved, but new possibilities also emerge, such as tracking the exact ownership chain.
<br>
1. Retaiers and sellers will have ease to add product and warranty details related to that product.They can choose to create the warranty as soulbound NFT or transferable by setting the 'limit of transfers'
2. Whenever the user buys a product, they are issued a new warranty NFT which icludes metadata such as `owner_address`,`owner details`,`validity_period`,`active_status`,`retailer_address`, and other purchasing history details. Generative NFTs are created with the image provided by retailers and a unique NFT artwork is assigned to user.
3. These NFTs (if mentioned by seller) can be transfered.The number of warranty transfers of a product can be limited and controlled. Some warranties are non-transferable `Soulbound NFT` to new owners whereas others offer unlimited transfers. Tokenized warranties can accurately enforce these rules.
4. A product's exact ownership chain can be traced
5. Along with these, a gamification loyalty construct program is created for more interaction and retention of users to the website with the help of reward and challenge system.

### Retailers/Sellers Fucntions
The retailer address is recorded as a part of the smart contract's storage. An retailer has the right to create a new peoduct,issue a new warranty NFT with its respective metadata such as the product's serial number, the warranty's duration, etc. The administrator can also transfer their privileges to another administrator address.

### User Functions
A user of this smart contract can query the blockchain for the warranty NFTs under their possession. Additionally, a user may transfer any of their warranties that are not yet expired and still have remaining allowed transfers. A user can also delegate custody of a specified warranty NFT to another address. The delegate may then operate on the NFT as if they were the user with the original ownership.

### Brownie Points 
* Polygon Blockchain is used to deploy our final solution
* NFTs are decaying in nature
* Geneative NFT are created as a way to ease the function of retailers to generate NFT everytime a warranty is issued to customer
* Usage of SoulBound NFT
* Adding any engagement/gamification construct to the loyalty program 
* Warranty card is sent to user's mobile via SMS (twilio) and Email Address (Nodemailer)
### Installation Steps:

1. Compile and deploy contract

```shell
npm install
npx hardhat node
npx hardhat compile
npx hardhat deploy (or) npx hardhat run scripts/deployContract.js --network polygonTest
npx hardhat test
```
2. Copy deployed contract address and replace contract address in ```client/src/blockchain.js``` with newly deployed address and then run react app in ```client``` directory

```shell
cd client
npm install
npm start
```

2. Start the React Frontend

```shell
cd web
npm install
npm start 
```
The web application can be viewed at http://localhost:3000/

### Demo Video
You can watch the project demonstration video uploaded <a href="https://drive.google.com/file/d/17yCQ-Ldqeu5kGN5Rtmpw3yPakunkQ2IT/view?usp=sharing">here</a>

### Team Members 
1. <a href="https://github.com/vaishnavi-vsp">Vaishanvi Patil</a>
2. <a href="https://github.com/KrutikaBhatt">Krutika Bhatt </a>
3. <a href="https://github.com/kamalrohra"> Kamal Rohra </a>
