import { memo } from 'react';
import RouteController from './route/routeController.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import store, { persistor } from 'store/Store.ts';
import LoadingScreen from 'views/LoadingScreen/LoadingScreen.tsx';
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({ 
  clientId: process.env.REACT_APP_CLIENT_ID
});

// connect to your contract
export const contractNFT = getContract({ 
  client, 
  chain: defineChain(97), 
  address: "0x632f0c877F58587294977540bE27D8F61ee7b036"
});

// connect to your contract
export const contractMKP = getContract({ 
  client, 
  chain: defineChain(97), 
  address: "0x632f0c877F58587294977540bE27D8F61ee7b036"
});

const App = memo(() => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThirdwebProvider>
          <RouteController />        
        </ThirdwebProvider>
      </PersistGate>
    </Provider>
  );
});

App.displayName = 'App';

export default App;
