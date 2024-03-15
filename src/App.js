import { memo } from 'react';
import RouteController from './route/routeController.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import store, { persistor } from 'store/Store.ts';
import LoadingScreen from 'views/LoadingScreen/LoadingScreen.tsx';

const App = memo(() => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
});

App.displayName = 'App';

export default App;
