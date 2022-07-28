import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import LeaderBoard from './Components/LoyaltyConstruct/LeaderBoard'
import MyOrders from './Components/Orders/orders';
import ChallengeBoard from './Components/Challenge-Board/Board'
import AddProduct from './Components/AdminPanel/addProduct'
import MyProfile from './Components/MyProfile/MyProfile'
import Checkout from './Components/AdminPanel/Checkout'
import Warrantydetails from './Components/Orders/warranty'
import { Box } from '@material-ui/core'

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{ marginTop: 54 }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/cart' component={Cart} />
              {/* <Route exact path= '/product/:id' component={Product} /> */}
              <Route exact path='/product/:id' component={DetailView} />
              <Route exact path='/leaderboard' component={LeaderBoard} />
              <Route exact path="/challengeboard" component={ChallengeBoard} />
              <Route exact path='/myprofile' component={MyProfile} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/admin/addProduct' component={AddProduct}/>
              <Route exact path='/myorders' component={MyOrders} />
              <Route exact path='/warranty/:id' component={Warrantydetails} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
