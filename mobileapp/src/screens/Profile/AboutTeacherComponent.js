import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts } from '../../assets/styles/theme';
import { AirbnbRating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';

export const AboutTeacherComponent = () => {

    const { t, i18n } = useTranslation();

    return (
        <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
            <Text style={[{ ...fonts.light} , i18n.language === 'ar' ? { textAlign: 'right' } : '']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Suspendisse potenti. Praesent nulla tellus, suscipit sed nunc et, interdum eleifend erat. Donec lobortis turpis ac suscipit ultricies. Nam porttitor odio augue, eget accumsan neque dignissim tempus. In mattis enim tempus velit accumsan, sit amet auctor libero faucibus. Proin ante leo, lacinia nec elit sit amet, convallis fringilla justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...fonts.light, alignSelf: 'flex-start'}}>Rate : </Text>
                <AirbnbRating showRating={false} size={16} count={5} selectedColor="#F5A623" />
            </View>
            <Text style={{...fonts.bold, marginTop: 20, alignSelf: 'flex-start'}}>Attachments : </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                <View>
                    <Image source={require('../../assets/images/profile_icons/1.png')} style={{ width: 60, height: 60 }} />
                    <Text style={{...fonts.bold, fontSize: 12, alignSelf: 'center', marginTop: 5}}>Resume</Text>
                </View>
                <View>
                    <Image source={require('../../assets/images/profile_icons/2.png')} style={{ width: 60, height: 60 }} />
                    <Text style={{...fonts.bold, fontSize: 12, alignSelf: 'center', marginTop: 5}}>Degrees</Text>
                </View>
                <View>
                    <Image source={require('../../assets/images/profile_icons/3.png')} style={{ width: 60, height: 60 }} />
                    <Text style={{...fonts.bold, fontSize: 12, alignSelf: 'center', marginTop: 5}}>Certificates</Text>
                </View>
                <View>
                    <Image source={require('../../assets/images/profile_icons/4.png')} style={{ width: 60, height: 60 }} />
                    <Text style={{...fonts.bold, fontSize: 12, alignSelf: 'center', marginTop: 5}}>Experiences</Text>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

});