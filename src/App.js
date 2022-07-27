import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, NotFound } from "./Components/default";
import Header from "./Components/Header/Header";
import DetailView from "./Components/ItemDetails/DetailView";
import TemplateProvider from "./templates/TemplateProvider";
import ContextProvider from "./context/ContextProvider";
import Cart from "./Components/Cart/Cart";
import LeaderBoard from "./Components/LoyaltyConstruct/LeaderBoard";
import ChallengeBoard from "./Components/Challenge-Board/Board";
import MyProfile from "./Components/MyProfile/MyProfile";
import Checkout from "./Components/AdminPanel/Checkout";
import { Box } from "@material-ui/core";
import { abi } from "./artifacts/contracts/dMarket.sol/dMarket.json";
import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);

  const initWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
      const web3Modal = new Web3Modal({
        network: "polygonTest",
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const { chainId } = await provider.getNetwork();
      console.log("chainId:", chainId);
      if (chainId !== 80001)
        reject("Wrong network. Please switch to Polygon Mumbai Test network");
      const signer = provider.getSigner();
      const contract = new Contract(
        "0xD000D8780423eCC14E0f7cbE04F502AF8D101BA8",
        abi,
        signer,
      );
      resolve({ contract });
    });
  };
  useEffect(() => {
    initWeb3()
      .then(async ({ contract }) => {
        setContract(contract);
        const marketItemCount = await contract.getNFTCount();
        console.log("this is the count ");
        console.log(marketItemCount);
        const items = [];
        for (let i = 1; i <= parseInt(marketItemCount.toString()); i++) {
          const item = await contract.nfts(i);
          const tokenURI = await contract.tokenURI(i);
          const meta = await axios.get(tokenURI);
          const price = ethers.utils.formatEther(item.price.toString());
          items.push({ ...item, price, meta: meta.data });
        }
        setNfts(items);
        console.log("Market items: ", nfts);
      })
      .catch((err) => {
        console.log("err:", err);
        // setLogMessage(err);
      });
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
              <Route exact path='/myprofile' component={MyProfile} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/admin/addProduct' component={AddProduct}/>
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}
export default App;
