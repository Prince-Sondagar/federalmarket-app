import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RouteScreen from './screens';
import store from './store';
import './localization/index';

export type ThemColors = {
  primary: string;
  border: string;
  background: string;
  text: string;
  notification: string;
  card: string;
};

function App(): JSX.Element {
  const MyTheme = {
    dark: false,
    colors: {
      primary: '#288CD5',
      border: '#DDDDDD',
      background: '#fff',
      text: '#20222F',
      notification: '#FA5247',
      card: '#1D1D1D',
    },
  };
  const Stack = createStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer theme={MyTheme}>
        <Provider store={store}>
          <RouteScreen />
        </Provider>
      </NavigationContainer>
    </I18nextProvider>
  );
}

export default App;
