import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Linking, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {observer} from 'mobx-react-lite';
import {colors, fonts} from '../../assets/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {transparent} from 'react-native-paper/lib/typescript/styles/colors';

export default ContactComponent = observer(() => {

  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('sign:contact'),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e74295', '#7f509b']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.body}>
        <ScrollView>
          <Image
            source={require('../../assets/icons/logo1.png')}
            style={{alignSelf: 'center', width: 100, height: 100}}
          />
          <View style={{margin: 20, marginTop: 50}}>
            <Text
              style={{
                textAlign: 'justify',
                ...fonts.light,
                lineHeight: 25,
                color: 'white',
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:+97450853357`);
              }}
              style={{
                marginTop: 50,
                padding: 15,
                marginHorizontal: 50,
                marginVertical: 20,
                borderRadius: 30,
                backgroundColor: '#128C7E',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', ...fonts.black}}>Phone Number</Text>
              <Text style={{color: 'white', ...fonts.light}}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'whatsapp://send?text=hello&phone=+97450853357',
                );
              }}
              style={{
                padding: 15,
                marginHorizontal: 50,
                marginTop: 0,
                borderRadius: 30,
                backgroundColor: '#25D366',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', ...fonts.black}}>
                Whatsapp Number
              </Text>
              <Text style={{color: 'white', ...fonts.light}}>Contact Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', //colors.base,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});