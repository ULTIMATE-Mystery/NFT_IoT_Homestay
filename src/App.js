import { memo } from 'react';
import RouteController from './route/routeController';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from 'store/Store';
import LoadingScreen from 'views/LoadingScreen/LoadingScreen';

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
