import React, { Suspense } from 'react';
import { Text } from "react-native";
import AppStack from './stack';
import  "./I18n/index";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

export default function App() {
  return (
    <Suspense fallback={<Text>loading...</Text>}>
      <AppStack />
    </Suspense>
  );
}
