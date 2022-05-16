import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, TabBar} from 'react-native-tab-view';
import {TeachersNearByComponent} from './TeachersNearByScreen';
import {TeachersBySubjectComponent} from './TeachersBySubjectScreen';
import {colors, fonts, INPUT_HEIGHT} from '../../assets/styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';

const initialLayout = {width: Dimensions.get('window').width};

export default TeachersListComponent = observer(() => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'bySubject', title: t('tabs:1')},
    {key: 'nearBy', title: t('tabs:2')},
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('screens:teachers'),
      // headerLeft: () => {
      //     return (
      //         <TouchableOpacity
      //             style={{ paddingHorizontal: 15 }}
      //             onPress={() => navigation.toggleDrawer()}
      //         >
      //             <Feather name="menu" color={colors.white} size={20} />
      //         </TouchableOpacity>
      //     )
      // }
    });
  }, [navigation]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'bySubject':
        return <TeachersBySubjectComponent />;
      case 'nearBy':
        return <TeachersNearByComponent />;
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={{color: 'black', ...fonts.bold}}
      indicatorStyle={{backgroundColor: colors.base}}
      style={{backgroundColor: 'white'}}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => navigation.push('Maps')}>
            <Fontisto name="map-marker-alt" color={colors.white} size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const searchTeachers = textSearched => {
    navigation.navigate('Home', {
      screen: 'SearchTeachers',
      params: {text: textSearched},
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e74295', '#7f509b']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.body}>
        <View style={{height: 20}} />
        <View style={{marginBottom: 10}}>
          <TextInput
            placeholder={t('search:key')}
            placeholderTextColor="#c2c0c8"
            style={[
              styles.textInput,
              i18n.language === 'ar' ? {textAlign: 'right'} : '',
            ]}
            autoCorrect={false}
            onChangeText={text => setText(text)}
            autoCapitalize={'none'}
            multiline={false}
            editable={true}
            autoFocus={false}
          />
          <TouchableOpacity
            style={styles.inputIcon}
            onPress={() => (text ? searchTeachers(text) : null)}>
            <Ionicons
              style={{color: colors.base}}
              name={'md-search'}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, margin: 20, marginTop: 5}}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  textInput: {
    ...INPUT_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    backgroundColor: colors.white,
    borderWidth: 0.25,
    borderColor: '#eee',
    ...fonts.cairoRegular,
    fontSize: 14,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 20,
    paddingHorizontal: 13,
    ...INPUT_HEIGHT,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
