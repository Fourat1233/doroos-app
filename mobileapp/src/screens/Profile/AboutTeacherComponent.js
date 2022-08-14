import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {fonts} from '../../assets/styles/theme';
import {AirbnbRating} from 'react-native-ratings';
import {useTranslation} from 'react-i18next';

export const AboutTeacherComponent = () => {
  const {t, i18n} = useTranslation();
  const [resumeDisabled, setResumeDisabled] = useState(true);
  const [degreesDisabled, setDegreesDisabled] = useState(true);
  const [certificatesDisabled, setCertificatesDisabled] = useState(true);

  return (
    <ScrollView
      style={{marginTop: 20, marginBottom: 20, flex: 1}}
      showsVerticalScrollIndicator={false}>
      <Text
        style={[
          {...fonts.light, color: 'black'},
          i18n.language === 'ar' ? {textAlign: 'right'} : '',
        ]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Suspendisse potenti. Praesent nulla tellus,
        suscipit sed nunc et, interdum eleifend erat. Donec lobortis turpis ac
        suscipit ultricies. Nam porttitor odio augue, eget accumsan neque
        dignissim tempus. In mattis enim tempus velit accumsan, sit amet auctor
        libero faucibus. Proin ante leo, lacinia nec elit sit amet, convallis
        fringilla justo. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </Text>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <AirbnbRating
          showRating={false}
          size={16}
          count={5}
          selectedColor="#F5A623"
        />
      </View>
      <Text
        style={{
          ...fonts.bold,
          marginTop: 20,
          alignSelf: 'flex-start',
          color: 'black',
        }}>
        Attachments :
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <View>
          <TouchableOpacity disabled={resumeDisabled}>
            <Image
              source={require('../../assets/images/profile_icons/1.png')}
              style={{width: 60, height: 60, opacity: resumeDisabled ? 0.5 : 1}}
            />
            <Text
              style={{
                ...fonts.bold,
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 5,
                color: 'black',
                opacity: resumeDisabled ? 0.5 : 1,
              }}>
              Resume
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity disabled={degreesDisabled}>
            <Image
              source={require('../../assets/images/profile_icons/2.png')}
              style={{
                width: 60,
                height: 60,
                opacity: degreesDisabled ? 0.5 : 1,
              }}
            />
            <Text
              style={{
                ...fonts.bold,
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 5,
                color: 'black',
                opacity: degreesDisabled ? 0.5 : 1,
              }}>
              Degrees
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity disabled={certificatesDisabled}>
            <Image
              source={require('../../assets/images/profile_icons/3.png')}
              style={{
                width: 60,
                height: 60,
                opacity: certificatesDisabled ? 0.5 : 1,
              }}
            />
            <Text
              style={{
                ...fonts.bold,
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 5,
                color: 'black',
                opacity: certificatesDisabled ? 0.5 : 1,
              }}>
              Certificates
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <Image
            source={require('../../assets/images/profile_icons/4.png')}
            style={{width: 60, height: 60}}
          />
          <Text
            style={{
              ...fonts.bold,
              fontSize: 12,
              alignSelf: 'center',
              marginTop: 5,
              color: 'black',
            }}>
            Experiences
          </Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
