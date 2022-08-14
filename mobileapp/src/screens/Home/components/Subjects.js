import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors, fonts} from '../../../assets/styles/theme';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

export const Subjects = ({subjects}) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      let user = await AsyncStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      }
    })();
  }, []);

  return (
    <View style={{marginLeft: 10}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {subjects.map(elm => (
          <TouchableOpacity
            key={elm.id}
            style={styles.cardTop}
            onPress={() => {
              if (user) {
                navigation.navigate('List', {
                  screen: 'BySubject',
                  params: {
                    subjectId: elm.id,
                    subjectName: elm.name,
                  },
                });
              } else {
                navigation.navigate('SignIn');
              }
            }}>
            <Image
              style={[styles.picture, {padding: 20}]}
              source={{
                uri: `http://doroosapp.com/uploads/subjects/${elm.icon_url}`,
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontSize: 12, ...fonts.cairoBold, marginBottom: 5}}>
              {i18n.language === 'ar' ? elm.ar_name : elm.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 12,
                ...fonts.cairoSemiBold,
                color: colors.grey.placeholder,
              }}>
              {i18n.language === 'ar' ? elm.ar_name : elm.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTop: {
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 2,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: width / 2 - 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2,
  },
  picture: {
    width: 45,
    height: 45,
    marginBottom: 10,
  },
});
