/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// In App.js in a new project

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppContext, { context } from "./src/context/AppContext";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { InitNav } from "./src/navigations/InitNav";
import reducer from './src/store/reducers/reducer';
import reduxThunk from 'redux-thunk';
import loginReducer from './src/moduler/auth/store/reducers/AuthReducer';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import {requestUserPermission, NotificationListner} from './src/utils/pushnotification_helper';
import notifee, { EventType } from '@notifee/react-native';
import { StatusBar } from 'react-native';
import Colors from './src/constants/Colors';
import SplashScreen from 'react-native-splash-screen'
import { useNetInfo } from "@react-native-community/netinfo";
import InternetConection from './src/components/UI/InternetConection';

const rootReducer = combineReducers({
  reducer: reducer,
  auth: loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

function App() {
  const netInfo = useNetInfo();
  React.useEffect(()=>{
    SplashScreen.hide();
    requestUserPermission();
    return ()=>{};
  }, []);

  // Subscribe to events
  React.useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
  
  return (
    <Provider store={store}>
      <PaperProvider
      settings={{ icon: (props) => <MaterialIcons {...props} /> }}>
        <AppContext>
        <StatusBar  backgroundColor={Colors.primary} />
          <InitNav />
        </AppContext>
        <InternetConection netInfo={netInfo}/>
      </PaperProvider>
    </Provider>

  );
}




export default App;