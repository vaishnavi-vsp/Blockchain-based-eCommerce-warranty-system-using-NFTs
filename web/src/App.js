import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, NotFound } from "./Components/default";
import Header from "./Components/Header/Header";
import DetailView from "./Components/ItemDetails/DetailView";
import TemplateProvider from "./templates/TemplateProvider";
import ContextProvider from "./context/ContextProvider";
import Cart from "./Components/Cart/Cart";
import LeaderBoard from "./Components/LoyaltyConstruct/LeaderBoard";
import MyOrders from "./Components/Orders/orders";
import ChallengeBoard from "./Components/Challenge-Board/Board";
import AddProduct from "./Components/AdminPanel/addProduct";
import MyProfile from "./Components/MyProfile/MyProfile";
import Checkout from "./Components/AdminPanel/Checkout";
import Warrantydetails from "./Components/Orders/warranty";
import AllProducts from "./Components/AdminPanel/AllProducts";
import { Box } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import Web3Modal from "web3modal";
import Web3 from "web3";
import { useEffect,useState,useContext } from "react";
import Typography from '@mui/material/Typography';
import MarketplaceAddress from  './marketPlaceAddress.json'
import MarketplaceAbi from './artifacts/contracts/dMarket.sol/dMarket.json'
import { ethers } from "ethers"
import AuthRoute from './service/authRoute.js'
import { Allnfts } from "./Components/MyNfts/allnfts";
import { NftCard } from "./Components/MyNfts/nftcard";

function App() {
  const [account123, setAccount] = useState(null)
  const [contract,setContract] = useState(null)
  const [loading,setLoading] = useState(true)
  const [provider,setProvider] = useState(null)
  
  const initWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
      const web3Modal = new Web3Modal({
        network: "polygonTest",
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const web3 = new Web3(connection);
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      let networkType = network.charAt(0).toUpperCase() + network.slice(1) + " Network";
      let balance = await web3.eth.getBalance(accounts[0]);
      balance = web3.utils.fromWei(balance,'ether')
      localStorage.setItem("address", accounts[0]);
      localStorage.setItem("networkType",networkType);
      localStorage.setItem("balance",balance);
    });
  };

  const initWeb32 = async()=>{
    
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      console.log("These are the accounts")
      console.log("Account :",account123)
      
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
      let balance = ethers.utils.formatEther((await provider.getBalance(accounts[0])))
      let network = (await provider.getNetwork()).name 
      console.log("This is the block number")
      console.log(await provider.getBlockNumber())
      const block = await provider.getBlockNumber()
      const signer = provider.getSigner()
      localStorage.setItem("address",accounts[0]);
      localStorage.setItem("networkType",network.toUpperCase());
      localStorage.setItem("balance",balance);
      
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        await initWeb32()
      })

      await loadContracts(signer,accounts[0],block)
   

  }

  const loadContracts = async(signer,account,block)=>{
    
    const marketplace = new ethers.Contract(MarketplaceAddress.address,MarketplaceAbi.abi,signer)
    console.log(marketplace)
    // console.log("This is the acount being passed")
    // console.log(account)
    // if(context && !context.account.marketplace){
    //   context.updateMarketplace(marketplace)
    //   console.log("Update marketplace ran")
    // }
    
   
    // var data = marketplace.filters.CreateNFT(null,null,account,null)
    // const results = await marketplace.queryFilter(data,block-1000)
    console.log("This is the data we are printing")
    // console.log(results)
    setContract(marketplace)
    setLoading(false)
    console.log("Loading set to false")
  }
  useEffect(() => {
    
  // console.log("This is the context")
  // console.log(context)
  
    initWeb32();
    console.log("Ended with use effect")
  }, []);

  return (
    <TemplateProvider>
      {
        loading ? <Box sx={{ display: 'flex' }} style={{margin:'80px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
        <CircularProgress />
        <Typography component="h4" variant="h6" align="center" margin='10px'>Loading ...</Typography>
      </Box>:
        <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{ marginTop: 54 }}>
            <Switch>
              <Route exact path="/" render={() => (<Home account={account123} contract={contract} initWeb32={initWeb32} />)}  />
              <Route exact path="/cart" component={Cart} />
              {/* <Route exact path= '/product/:id' component={Product} /> */}
              <Route exact path="/product/:id" render={({match}) => (<DetailView match={match} contract={contract} />  )} />
              {/* <Route exact path="/product/:id"  component={DetailView} /> */}
              <Route exact path="/leaderboard" component={LeaderBoard} />
              <AuthRoute exact path="/challengeboard" component={ChallengeBoard} />
              <AuthRoute exact path="/myprofile" component={MyProfile} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/myorders" component={MyOrders} />
              <Route exact path="/warranty/:id" render={({match}) => (<Warrantydetails match={match} contract={contract} account={account123} />)} />
              <Route exact path="/admin/addProduct" component={AddProduct} />
              <Route exact path="/admin/allProducts" component={AllProducts} />
              <Route exact path='/nftCards' render={({match}) => (<Allnfts contract={contract} provider={provider} account={account123} />  )}/>
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
      }
      
    </TemplateProvider>
  );
}

export default App;
