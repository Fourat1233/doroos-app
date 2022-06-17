import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/styles/theme';
import {HomeScreen} from '../screens/Home/HomeScreen';
import HomeSearchScreen from '../screens/Home/HomeSearchScreen';
import TeachersScreen from '../screens/Teachers';
import TeachersListMaps from '../screens/Teachers/TeachersListMaps';
import {SearchScreen} from '../screens/Search/SearchScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {BySubjectsScreen} from '../screens/Teachers/BySubjectsScreen';
import {DrawerContent} from './DrawerContent';
import ContactComponent from '../screens/Contact/ContactScreen';
import FirstStepComponent from '../screens/CreateProfile/FirstStepScreen';
import SecondStepComponent from '../screens/CreateProfile/SecondStepScreen';
import ThirdStepComponent from '../screens/CreateProfile/ThirdStepScreen';
import FourthStepComponent from '../screens/CreateProfile/FourthStepScreen';
import {SearchProvider} from '../screens/Search/context';
import Drawer from 'react-native-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {setDrawerOpen, selectDrawerOpen} from '../redux/slices/generalSlice';

const MainStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

const headerBg = () => {
  return (
    <LinearGradient
      colors={['#e74595', '#7f519b']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.gradient}
    />
  );
};

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactComponent}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="CreateProfile"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        component={CreateProfileStack}
      />
      <Stack.Screen
        name="SearchTeachers"
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
        component={HomeSearchScreen}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <SearchProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerBackground: headerBg,
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </SearchProvider>
  );
}

function CreateProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="FirstStep"
        component={FirstStepComponent}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SecondStep"
        component={SecondStepComponent}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ThirdStep"
        component={ThirdStepComponent}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="FourthStep"
        component={FourthStepComponent}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ListStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Teachers"
        component={TeachersScreen}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Maps"
        component={TeachersListMaps}
        options={{
          headerBackground: headerBg,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="BySubject"
        component={BySubjectsScreen}
        options={({route}) => ({
          title: route.params?.subjectName,
          headerBackground: headerBg,
        })}
      />
    </Stack.Navigator>
  );
}

function NavigationTabs() {
  const {t, i18n} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.base,
        tabBarStyle: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: 'white',
          position: 'absolute',
          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 1.2,
          },
          shadowOpacity: 0.35,
          shadowRadius: 3,
          elevation: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: route.state && route.state.index === 0,
          tabBarLabel: t('home'),
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: route.state && route.state.index === 0,
          tabBarLabel: t('search'),
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-search" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="List"
        component={ListStack}
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: route.state && route.state.index === 0,
          tabBarLabel: t('list'),
          tabBarIcon: ({color, size}) => (
            <Entypo name="list" color={color} size={size} />
          ),
        })}
      />

      {/* <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={({ route }) => ({
                    tabBarVisible: route.state && route.state.index === 0,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" color={color} size={size} />
                    ),
                })} /> */}
    </Tab.Navigator>
  );
}

// function MyDrawer() {
//   return (
//     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
//       <Drawer.Screen name="Main" component={NavigationTabs} />
//     </Drawer.Navigator>
//   );
// }

export default function NavigationStack() {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState('en');
  const open = useSelector(selectDrawerOpen);

  const STORAGE_KEY = '@APP:languageCode';

  useEffect(() => {
    (async () => {
      const l = await AsyncStorage.getItem(STORAGE_KEY);
      if (l) {
        setLanguage(l);
      }
    })();
  }, []);

  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeRight={() => {
        if (language === 'en') dispatch(setDrawerOpen(true));
      }}
      onSwipeLeft={() => {
        if (language === 'ar') dispatch(setDrawerOpen(true));
      }}>
      <Drawer
        onClose={() => {
          dispatch(setDrawerOpen(false));
        }}
        content={<DrawerContent key={open} />}
        tapToClose={true}
        openDrawerOffset={0.3}
        open={open}>
        <NavigationTabs />
      </Drawer>
    </GestureRecognizer>
  );
}
