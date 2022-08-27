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
import Web3Modal from "web3modal";
import Web3 from "web3";
import { useEffect,useState } from "react";
import MarketplaceAddress from  './marketPlaceAddress.json'
import MarketplaceAbi from './artifacts/contracts/dMarket.sol/dMarket.json'
import { connect } from "react-redux";
import { ethers } from "ethers"

function App() {
  const [account, setAccount] = useState(null)
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
      console.log("address", accounts[0])
      console.log("networkType",networkType)
      console.log("balance",balance)
      localStorage.setItem("address", accounts[0]);
      localStorage.setItem("networkType",networkType);
      localStorage.setItem("balance",balance);
    });
  };

  const initWeb32 = async()=>{
    return new Promise(async(resolve,reject)=>{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      console.log("These are the accounts")
      console.log(accounts[0])
    
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      let balance = ethers.utils.formatEther((await provider.getBalance(accounts[0])))
      let network = (await provider.getNetwork()).name 
      console.log(balance)
      console.log(network)
      const signer = provider.getSigner()
      localStorage.setItem("address",accounts[0]);
      localStorage.setItem("networkType",network);
      localStorage.setItem("balance",balance);
      console.log(window.ethereum.networkVersion)
      
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        await initWeb32()
      })

      loadContracts(signer)
    })

  }

  const loadContracts = async(signer)=>{
    const marketplace = new ethers.Contract(MarketplaceAddress.address,MarketplaceAbi.abi,signer)
    console.log(marketplace)
  }
  useEffect(() => {
    initWeb32();
  }, []);

  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{ marginTop: 54 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              {/* <Route exact path= '/product/:id' component={Product} /> */}
              <Route exact path="/product/:id" component={DetailView} />
              <Route exact path="/leaderboard" component={LeaderBoard} />
              <Route exact path="/challengeboard" component={ChallengeBoard} />
              <Route exact path="/myprofile" component={MyProfile} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/myorders" component={MyOrders} />
              <Route exact path="/warranty/:id" component={Warrantydetails} />
              <Route exact path="/admin/addProduct" component={AddProduct} />
              <Route exact path="/admin/allProducts" component={AllProducts} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
