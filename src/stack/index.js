import React, { useState, useEffect } from 'react';
import { StatusBar} from 'react-native';
import AppNavigationStack from "./RootStack";
import { Components } from '../screens/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingComponent } from '../screens/Welcome/OnboardingScreen';
import { navigationRef } from '../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const AppStack = () => {

  const [firstAccess, setFirstAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let first_access = await AsyncStorage.getItem('firstAccess')
        if (first_access) {
          setFirstAccess(first_access);
        }
      } catch (e) {
      }
      setTimeout(async () => {
        await setIsLoading(false)
      }, 2000);
      // await AsyncStorage.removeItem('user')
    };
    bootstrapAsync();
  }, []);

  return (
    // initialRouteName={!firstAccess ? "Onboarding" : "Main"}
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor="#82c543" barStyle="light-content" />
      {isLoading ? (<Components.AuthLoadingComponent />)
        : (
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={AppNavigationStack}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingComponent}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
}

export default AppStack;
