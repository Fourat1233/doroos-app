import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, INPUT_HEIGHT} from '../../assets/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Teachers} from './components/Teachers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {usePopularFetch} from '../shared/hooks';
import {Subjects} from './components/Subjects';
import {Spinner} from '../shared/components';

const {width} = Dimensions.get('window');

export const HomeScreen = () => {
  const {
    items: {teachers, subjects},
    load,
    loading,
  } = usePopularFetch('load_popular');
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [text, setText] = useState();

  const clickSignUpHandler = () => navigation.push('SignUp');

  const searchTeachers = textSearched => {
    navigation.navigate('Home', {
      screen: 'SearchTeachers',
      params: {text: textSearched},
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e74595', '#7f519b']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.body}>
        <View style={{marginBottom: 10, marginTop: 20}}>
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
        {loading ? (
          <Spinner />
        ) : (
          <ScrollView>
            <Text
              style={{
                paddingLeft: 20,
                paddingBottom: 10,
                ...fonts.cairoBold,
                alignSelf: 'flex-start',
              }}>
              {t('home:popular-teacher')}
            </Text>
            <Teachers teachers={teachers} loading={loading} />
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignSelf: 'flex-start',
                ...fonts.cairoBold,
              }}>
              {t('home:popular-subject')}
            </Text>
            <Subjects subjects={subjects} loading={loading} />
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                margin: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={clickSignUpHandler}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: colors.white,
                    ...fonts.cairoSemiBold,
                    alignSelf: 'center',
                  }}>
                  {t('sign:sign-up')}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: colors.white,
                    ...fonts.cairoLight,
                    alignSelf: 'center',
                    fontSize: 11,
                  }}>
                  {t('sign:free-registration')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Contact');
                }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: colors.white,
                    ...fonts.cairoSemiBold,
                    alignSelf: 'center',
                  }}>
                  {t('sign:contact')}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: colors.white,
                    ...fonts.cairoLight,
                    alignSelf: 'center',
                    fontSize: 11,
                  }}>
                  {t('sign:support')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

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
    paddingBottom: 50,
  },
  button: {
    backgroundColor: colors.base,
    padding: 20,
    borderRadius: 60,
    width: width / 2 - 30,
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
    color: 'black',
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
