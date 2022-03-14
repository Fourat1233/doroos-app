/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './src/I18n/index';

AppRegistry.registerComponent(appName, () => App);
