import ipfsAPI from 'ipfs-api';
import fs from 'fs';


//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

//Addfile router for adding file a local file to the IPFS network without any local node
export const uploadFile = async (req, res) => {
    try {
        console.log(req.body.filename);
        let testFile = fs.readFileSync("C:/Users/User/Desktop/Blockchain-based-eCommerce-warranty-system-using-NFTs/client/backend/uploads/"+req.body.filename);
        //Creating buffer for ipfs function to add file to the system
        let testBuffer = new Buffer(testFile);
        ipfs.files.add(testBuffer, function (err, file) {
            if (err) {
                return res.status(500).json({'Error: ': err});
            }
            return res.status(200).json(file);     
        })
    } catch (error) {
        console.log("Error in catch :",error);
        res.status(500).json({'Error: ': error.message});     
    }
}

