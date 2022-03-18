import React, { useContext, useState, useLayoutEffect } from 'react';
import { 
    StyleSheet, Text, View, 
    TextInput, TouchableOpacity, 
    SafeAreaView, ActivityIndicator, 
    Image } from 'react-native'
import { colors, INPUT_HEIGHT, fonts } from '../../../assets/styles/theme';
import * as yup from 'yup'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native';
import AppWrapper from '../../../components/AppWrapper';
import { AuthContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

export default SignInComponent = () => {
    const authStore = useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    
    const _handleSubmit = async (values) => {
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('sign:sign-in'),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#e74295', '#7f509b']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.gradient}
            />
            <SafeAreaView style={styles.body}>
                <AppWrapper header={true}>
                    <Image source={require('../../../assets/icons/logo1.png')} style={{alignSelf: 'center',  width: 100, height: 100, marginBottom: '10%' }}/>
                    <Formik
                        initialValues={{ contact_point: '', password: '' }}
                        onSubmit={values => _handleSubmit(values)}
                        validationSchema={yup.object().shape({
                            contact_point: yup
                                .string()
                                .email()
                                .required(),
                            password: yup
                                .string()
                                .required(),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={{ ...fonts.cairoSemiBold, color: colors.black, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start' }}>{t('sign:email')}</Text>
                                <TextInput
                                    style={[styles.input, i18n.language === 'ar' ? { textAlign: 'right' } : '']}
                                    value={values.contact_point}
                                    onChangeText={handleChange('contact_point')}
                                    onBlur={() => setFieldTouched('contact_point')}
                                    autoCapitalize={false}
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.contact_point && errors.contact_point &&
                                    <Text style={{ fontSize: 10, color: 'red', marginTop: 10, alignSelf: 'flex-start' }}>{errors.contact_point}</Text>
                                }

                                <Text style={{ ...fonts.cairoSemiBold, color: colors.balck, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'  }}>{t('sign:password')}</Text>
                                <TextInput
                                    style={[styles.input, i18n.language === 'ar' ? { textAlign: 'right' } : '']}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    autoCapitalize={false}
                                    placeholder="* * * * * * *"
                                    secureTextEntry={true}
                                    onBlur={() => setFieldTouched('password')}
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 10, color: 'red', alignSelf: 'flex-start', marginTop: 10 }}>{errors.password}</Text>
                                }

                                <TouchableOpacity
                                    onPress={() => !loading ? handleSubmit() : null}
                                    style={{ marginTop: 20, backgroundColor: '#6A2793', padding: 12, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}>
                                    <LinearGradient
                                        colors={['#e74295', '#7f509b']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={[styles.gradient, { borderRadius: 20 }]}
                                    />
                                    { loading ?
                                        (
                                            <ActivityIndicator size={'small'} color={colors.white} animating={true} />
                                        ) :
                                        (
                                            <Text style={{ color: colors.white, alignSelf: 'center', ...fonts.cairoSemiBold, fontSize: 16 }}>{t('sign:sign-in')}</Text>
                                        )
                                    }
                                </TouchableOpacity>
                                <Text style={{ ...fonts.cairoSemiBold, marginVertical: 10, marginTop: 20, alignSelf: 'flex-start' }}>{t('sign:no-account')}</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.push('SignIn')}
                                    style={{ borderColor: colors.white, borderWidth: 1, padding: 12, borderRadius: 40 }}>
                                    <LinearGradient
                                        colors={['#e74295', '#7f509b']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={[styles.gradient, { borderRadius: 20 }]}
                                    />
                                    <Text style={{ color: colors.white, alignSelf: 'center', ...fonts.cairoSemiBold, fontSize: 16 }}>{t('sign:sign-up')}</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    </Formik>
                </AppWrapper>
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    body: {
        flex: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: 'white',
        paddingBottom: 50
    },
    input: {
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

        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 3,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
});