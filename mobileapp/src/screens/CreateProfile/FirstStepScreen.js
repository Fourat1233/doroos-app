import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { observer } from "mobx-react-lite"
import { colors, INPUT_HEIGHT, fonts } from '../../assets/styles/theme';
import * as yup from 'yup'
import { Formik } from 'formik'
import AppWrapper from '../../components/AppWrapper';
import LinearGradient from 'react-native-linear-gradient';

export default FirstStepComponent = observer(() => {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#e74295', '#7f509b']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.gradient}
            />
            <SafeAreaView style={styles.body}>
                <AppWrapper header={true}>

                    <Text style={{ ...fonts.regular, fontSize: 24, padding: 20, color: colors.base, alignSelf: 'center' }}>Create profile Step 1</Text>
                    <Formik
                        initialValues={{ about: '', country: 'QATAR', city: '' }}
                        onSubmit={values => _handleSubmit(values)}
                        validationSchema={yup.object().shape({
                            about: yup
                                .string()
                                .required(),
                            city: yup
                                .string()
                                .required(),
                            country: yup
                                .string()
                                .required(),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={{ ...fonts.bold, color: colors.black, marginTop: 20, marginBottom: 10 }}>About</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    value={values.about}
                                    multiline={true}
                                    onChangeText={handleChange('about')}
                                    onBlur={() => setFieldTouched('about')}
                                    placeholder=""
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.about && errors.about &&
                                    <Text style={{ fontSize: 10, color: 'red', marginTop: 10 }}>{errors.about}</Text>
                                }

                                <Text style={{ ...fonts.bold, color: colors.balck, marginTop: 20, marginBottom: 10 }}>Country</Text>
                                <TextInput
                                    style={styles.input}
                                    value={values.country}
                                    onChangeText={handleChange('country')}
                                    placeholder="QATAR"
                                    onBlur={() => setFieldTouched('country')}
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.country && errors.country &&
                                    <Text style={{ fontSize: 10, color: 'red', alignSelf: 'flex-start', marginTop: 10 }}>{errors.country}</Text>
                                }

                                <Text style={{ ...fonts.bold, color: colors.balck, marginTop: 20, marginBottom: 10 }}>City</Text>
                                <TextInput
                                    style={styles.input}
                                    value={values.city}
                                    onChangeText={handleChange('city')}
                                    placeholder=""
                                    onBlur={() => setFieldTouched('city')}
                                    placeholderTextColor={colors.grey.placeholder}
                                />
                                {touched.city && errors.city &&
                                    <Text style={{ fontSize: 10, color: 'red', alignSelf: 'flex-start', marginTop: 10 }}>{errors.city}</Text>
                                }
                                <TouchableOpacity
                                    onPress={() => navigation.push('SecondStep')}
                                    style={{ marginTop: 40, borderColor: colors.white, borderWidth: 1, padding: 12, borderRadius: 40 }}>
                                    <LinearGradient
                                        colors={['#e74295', '#7f509b']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={[styles.gradient, { borderRadius: 20 }]}
                                    />
                                    <Text style={{ color: colors.white, alignSelf: 'center', ...fonts.bold, fontSize: 16 }}>Next</Text>
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
        shadowRadius: 0.84,
        elevation: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    multilineInput: {
		paddingTop: 10,
		textAlignVertical: 'top',
		height: 180,
	},
});