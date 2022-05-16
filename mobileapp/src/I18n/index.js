import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import {NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

if (deviceLanguage === undefined) {
  deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0];
}

import en from './en.json';
import ar from './ar.json';

const STORAGE_KEY = '@APP:languageCode';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async callback => {
    const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const lng = savedDataJSON ? savedDataJSON : null;
    const selectLanguage = lng || deviceLanguage;
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: en,
      ar: ar,
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
