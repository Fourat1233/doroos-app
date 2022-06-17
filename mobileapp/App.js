/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Suspense} from 'react';
import {Text} from 'react-native';
import AppStack from './src/stack/AppStack';
import 'intl-pluralrules';
import './src/I18n/index';
import store from './src/redux/store';
import {Provider} from 'react-redux';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <Suspense fallback={<Text>loading...</Text>}>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </Suspense>
  );
};

export default App;
