import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, I18nManager } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts } from '../assets/styles/theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

export function DrawerContent(props) {
    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState(null);
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    const STORAGE_KEY = '@APP:languageCode';

    const _changeLng = async (lng) => {
        await AsyncStorage.setItem(STORAGE_KEY, lng);
        if (lng === 'ar') {
            setLanguage('ar')
            I18nManager.forceRTL(true);
            RNRestart.Restart();
        } else {
            setLanguage('en')
            I18nManager.forceRTL(false);
            RNRestart.Restart();
        }
    }

    const SignOut = async () => {
        await AsyncStorage.removeItem('user');
        RNRestart.Restart();
    }

    useEffect(async () => {
        (async () => {
            const l = await AsyncStorage.getItem(STORAGE_KEY)
            setLanguage(l)
            let user = await AsyncStorage.getItem('user')
            if (user) {
                setUser(JSON.parse(user));
            }
        })()

    }, []);

    changePicture = async () => {
        if (Platform.OS === 'android') {
            try {
                const pickedResponse = await ImagePicker.openPicker({
                    width: 500,
                    height: 500,
                    compressImageMaxWidth: 1000,
                    compressImageMaxHeight: 1000,
                    compressImageQuality: 1,
                })
                const fullPath = pickedResponse.path
                const filename = fullPath.replace(/^.*[\\\/]/, '')
                let pickedImage = { uri: fullPath, type: pickedResponse.mime, name: filename }
                setSelectedImage(pickedImage.uri);
                console.log('selectedImage', selectedImage);

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const pickedResponse = await ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true
                });
                let attachment = { uri: pickedResponse.path, name: pickedResponse.filename, type: pickedResponse.mime }
                setSelectedImage(attachment.uri);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    {user ?
                        (
                            <View style={styles.userInfoSection}>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <TouchableOpacity style={{ paddingRight: 5, marginBottom: 5 }} onPress={() => changePicture()}>
                                        <Avatar.Image
                                            source={{ uri: `https://api.adorable.io/avatars/50/abott@adorable.png` }}
                                            size={50}
                                        />
                                        <View style={{ height: 25, width: 25, borderRadius: 30, backgroundColor: colors.base, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, bottom: -5 }}>
                                            <Entypo name='camera' color={colors.white} size={12} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginHorizontal: 15, flexDirection: 'column' }}>
                                        <Title style={[styles.title, { ...fonts.cairoSemiBold }]}>{user.full_name}</Title>
                                        <Caption style={[styles.caption, { fontSize: 10, ...fonts.cairoSemiBold }]}>{user.email}</Caption>
                                    </View>
                                </View>
                            </View>
                        ) :
                        (
                            <View style={styles.userInfoSection}>
                                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ paddingRight: 5 }} >
                                        <Avatar.Image
                                            source={require('../assets/icons/logo1.png')}
                                            size={50}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ marginHorizontal: 15, flexDirection: 'column' }}>
                                        <Title style={[styles.title, { ...fonts.cairoSemiBold }]}>{t('drawer:welcome')}</Title>
                                        <Caption style={[styles.caption, { fontSize: 10, ...fonts.cairoSemiBold }]}>{t('drawer:subWelcome')}</Caption>
                                    </View>
                                </View>
                            </View>
                        )
                    }

                    <Drawer.Section style={styles.drawerSection}>
                        {user ?
                            (
                                <DrawerItem
                                    icon={({ color }) => (
                                        <Feather
                                            name="user"
                                            color={color}
                                            size={18}
                                        />
                                    )}
                                    label={t('drawer:profile')}
                                    labelStyle={{
                                        ...fonts.cairoSemiBold
                                    }}
                                    onPress={() => { navigation.navigate('Home', { screen: 'Profile' }) }}
                                />
                            ) : null
                        }
                        {user ?
                            (
                                <DrawerItem
                                    icon={({ color }) => (
                                        <Feather
                                            name="user-plus"
                                            color={color}
                                            size={18}
                                        />
                                    )}
                                    label={t('drawer:create')}
                                    labelStyle={{
                                        ...fonts.cairoSemiBold
                                    }}
                                    onPress={() => { navigation.navigate('CreateProfile', { screen: 'FirstStep' }) }}
                                />
                            ) : null
                        }
                        {user ?
                            (
                                <DrawerItem
                                    icon={({ color }) => (
                                        <Feather
                                            name="lock"
                                            color={color}
                                            size={18}
                                        />
                                    )}
                                    label={t('drawer:password')}
                                    labelStyle={{
                                        ...fonts.cairoSemiBold
                                    }}
                                    onPress={() => { console.log(2) }}
                                />
                            ) : null
                        }
                        {!user ?
                            (
                                <DrawerItem
                                    icon={({ color }) => (
                                        <Feather
                                            name="lock"
                                            color={color}
                                            size={18}
                                        />
                                    )}
                                    label={t('sign:sign-in')}
                                    labelStyle={{
                                        ...fonts.cairoSemiBold
                                    }}
                                    onPress={() => { navigation.navigate('Home', { screen: 'SignIn' }) }}
                                />
                            ) : null
                        }
                        {!user ?
                            (
                                <DrawerItem
                                    icon={({ color }) => (
                                        <Feather
                                            name="lock"
                                            color={color}
                                            size={18}
                                        />
                                    )}
                                    label={t('sign:sign-up')}
                                    labelStyle={{
                                        ...fonts.cairoSemiBold
                                    }}
                                    onPress={() => { navigation.navigate('Home', { screen: 'SignUp' }) }}
                                />
                            ) : null
                        }
                        <DrawerItem
                            icon={({ color }) => (
                                <Feather
                                    name="headphones"
                                    color={color}
                                    size={18}
                                />
                            )}
                            label={t('sign:contact')}
                            labelStyle={{
                                ...fonts.cairoSemiBold
                            }}
                            onPress={() => { navigation.navigate('Home', { screen: 'Contact' }) }}
                        />
                        <DrawerItem
                            icon={({ color }) => (
                                <FontAwesome
                                    name="language"
                                    color={color}
                                    size={18}
                                />
                            )}
                            label={t('drawer:changeLanguage')}
                            labelStyle={{
                                ...fonts.cairoSemiBold
                            }}
                            onPress={() => language === 'ar' ? _changeLng('en') : _changeLng('ar')}
                        />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {user ?
                (
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color }) => (
                                <Feather
                                    name="log-out"
                                    color={color}
                                    size={18}
                                />
                            )}
                            label={t('drawer:signout')}
                            labelStyle={{
                                ...fonts.cairoSemiBold
                            }}
                            onPress={() => { SignOut() }}
                        />
                    </Drawer.Section>
                ) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        marginTop: 0,
        fontWeight: 'bold',
        ...fonts.cairoSemiBold
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        ...fonts.cairoSemiBold
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
});