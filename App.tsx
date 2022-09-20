import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
