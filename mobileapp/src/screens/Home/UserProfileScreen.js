import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {colors, fonts} from '../../assets/styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {AboutTeacherComponent} from './AboutTeacherComponent';
import {ContactTeacherComponent} from './ContactTeacherComponent';
import {useLoadOneFetch} from '../shared/hooks';
import {Spinner} from '../shared/components';
import AvatarImage from '../../assets/images/profile_icons/4.png';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Avatar = ({avatar}) => {
  return (
    <ImagePlaceholder
      style={styles.avatar}
      source={{
        uri: avatar,
      }}
      placeholderSource={AvatarImage}
    />
  );
};

export function UserProfileScreen({route}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    let user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
    console.log('testtttt');
    console.log(user);
    console.log('testtttt');
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
        {!user ? (
          <Spinner />
        ) : (
          <ScrollView
            contentContainerStyle={{
              marginTop: 10,
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
                justifyContent: 'flex-start',
              }}>
              <Avatar avatar={user.profile_image} />
              <View style={{marginLeft: 10}}>
                <Text style={{...fonts.bold, fontSize: 16, color: 'black'}}>
                  {user.full_name}
                </Text>
                <Text
                  style={{
                    ...fonts.light,
                    fontSize: 16,
                    marginTop: 5,
                    ...fonts.light,
                    color: colors.base,
                  }}>
                  {user.email}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Text
                    style={{
                      ...fonts.light,
                      fontSize: 16,
                      marginLeft: 5,
                      color: colors.grey.placeholder,
                    }}>
                    {user.user_type.split('\\')[1]}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    padding: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  subjects: {
    ...fonts.light,
    fontSize: 16,
    marginTop: 5,
    ...fonts.light,
    color: colors.base,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
