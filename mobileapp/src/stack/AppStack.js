import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Platform, NativeModules} from 'react-native';
import AppNavigationStack from './RootStack';
import {Components} from '../screens/components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {OnboardingComponent} from '../screens/Welcome/OnboardingScreen';
import {navigationRef} from '../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from '../screens/AuthScreens/SignUp/SignUpScreen';
import SignInScreen from '../screens/AuthScreens/SignIn/SignInScreen';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();
const {StatusBarManager} = NativeModules;

const AppStack = () => {
  const [firstAccess, setFirstAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBar => {
        setStatusBarHeight(statusBar.height);
      });
    } else {
      setStatusBarHeight(StatusBar.currentHeight);
    }
    const bootstrapAsync = async () => {
      try {
        let first_access = await AsyncStorage.getItem('firstAccess');
        if (first_access) {
          setFirstAccess(first_access);
        }
      } catch (e) {}
      setTimeout(async () => {
        await setIsLoading(false);
      }, 2000);
      // await AsyncStorage.removeItem('user')
    };
    bootstrapAsync();
  }, []);

  return (
    // initialRouteName={!firstAccess ? "Onboarding" : "Main"}
    <LinearGradient
      colors={['#e74595', '#7f519b']}
      // colors={['#f9f6f6', '#fafafa']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={{...styles.gradient, paddingTop: statusBarHeight}}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <NavigationContainer ref={navigationRef}>
        {isLoading ? (
          <Components.AuthLoadingComponent />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={AppNavigationStack}
              options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="SignUp"
              options={{
                headerShown: false,
                headerBackTitleVisible: false,
              }}
              component={SignUpScreen}
            />
            <Stack.Screen
              name="SignIn"
              options={{
                headerShown: false,
                headerBackTitleVisible: false,
              }}
              component={SignInScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AppStack;
