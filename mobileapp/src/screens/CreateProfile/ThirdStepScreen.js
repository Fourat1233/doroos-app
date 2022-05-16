 import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { observer } from "mobx-react-lite"
import { colors, INPUT_HEIGHT, fonts } from '../../assets/styles/theme';
import * as yup from 'yup'
import { Formik } from 'formik'
import AppWrapper from '../../components/AppWrapper';
import LinearGradient from 'react-native-linear-gradient';

export default ThirdStepComponent = observer(() => {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#e74295', '#7f509b']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.gradient}
            />
            <SafeAreaView style={styles.body}>
                <AppWrapper header={true}>

                    <Text style={{ ...fonts.regular, fontSize: 24, padding: 20, color: colors.base, alignSelf: 'center' }}>Login</Text>
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
                                <Text style={{ ...fonts.bold, color: colors.black, marginTop: 20, marginBottom: 10 }}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={values.contact_point}
                                    onChangeText={handleChange('contact_point')}
                                    onBlur={() => setFieldTouched('contact_point')}
                                    placeholder="jhon@example.com"
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.contact_point && errors.contact_point &&
                                    <Text style={{ fontSize: 10, color: 'red', marginTop: 10 }}>{errors.contact_point}</Text>
                                }

                                <Text style={{ ...fonts.bold, color: colors.balck, marginTop: 20, marginBottom: 10 }}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="* * * * * * *"
                                    onBlur={() => setFieldTouched('password')}
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 10, color: 'red', alignSelf: 'flex-start', marginTop: 10 }}>{errors.password}</Text>
                                }
                                <TouchableOpacity
                                    onPress={() => navigation.push('SignIn')}
                                    style={{ marginTop: 40, borderColor: colors.white, borderWidth: 1, padding: 12, borderRadius: 40 }}>
                                    <LinearGradient
                                        colors={['#e74295', '#7f509b']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={[styles.gradient, { borderRadius: 20 }]}
                                    />
                                    <Text style={{ color: colors.white, alignSelf: 'center', ...fonts.bold, fontSize: 16 }}>Sign In</Text>
                                </TouchableOpacity>
                                <Text style={{ ...fonts.meduim, marginVertical: 10, marginTop: 20}}> If you don't have account create now. </Text>
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={{ backgroundColor: '#6A2793', padding: 12, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}>
                                    <LinearGradient
                                        colors={['#e74295', '#7f509b']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={[styles.gradient, { borderRadius: 20 }]}
                                    />
                                    <Text style={{ color: colors.white, alignSelf: 'center', ...fonts.bold, fontSize: 16 }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </AppWrapper>
            </SafeAreaView>
        </View>

    );
});

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