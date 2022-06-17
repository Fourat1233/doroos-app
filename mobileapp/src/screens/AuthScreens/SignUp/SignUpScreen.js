import React, {useContext, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {colors, INPUT_HEIGHT, fonts} from '../../../assets/styles/theme';
import * as yup from 'yup';
import {Formik} from 'formik';
import AppWrapper from '../../../components/AppWrapper';
import {RadioButton} from 'react-native-paper';
import {AuthContext} from '../context';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {register} from '../../shared/hooks';

export default function SignUpComponent() {
  const authStore = useContext(AuthContext);
  const [gender, setGender] = React.useState(null);
  const [accountType, setAccountType] = React.useState(null);
  const [account_type_error, setTypeError] = React.useState(false);
  const [gender_error, setGenderError] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();

  const _handleSubmit = async values => {
    setLoading(true);
    if (gender === null) {
      setGenderError(true);
    }
    if (accountType === null) {
      setTypeError(true);
    }
    if (!gender || !accountType) return;
    Object.assign(values, {account_type: accountType, gender: gender});
    try {
      await register(values);
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('sign:sign-up'),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.body}>
        <AppWrapper header={true}>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              alignSelf: 'center',
              marginBottom: 30,
              marginTop: 50,
            }}>
            {t('sign:sign-up')}
          </Text>
          <Formik
            initialValues={{
              full_name: '',
              contact_point: '',
              password: '',
              phone_number: '',
            }}
            onSubmit={values => _handleSubmit(values)}
            validationSchema={yup.object().shape({
              full_name: yup.string().required(),
              contact_point: yup.string().email().required(),
              password: yup.string().required(),
              phone_number: yup.string().required(),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View style={{paddingHorizontal: 20}}>
                <Text style={styles.label}>{t('sign:name')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    i18n.language === 'ar' ? {textAlign: 'right'} : '',
                  ]}
                  value={values.full_name}
                  onChangeText={handleChange('full_name')}
                  onBlur={() => setFieldTouched('full_name')}
                  placeholderTextColor={colors.grey.placeholder}
                />
                {touched.full_name && errors.full_name && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      alignSelf: 'flex-start',
                    }}>
                    {errors.full_name}
                  </Text>
                )}
                <Text style={styles.label}>{t('sign:phone')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    i18n.language === 'ar' ? {textAlign: 'right'} : '',
                  ]}
                  value={values.phone_number}
                  onChangeText={handleChange('phone_number')}
                  onBlur={() => setFieldTouched('phone_number')}
                  placeholderTextColor={colors.grey.placeholder}
                />
                {touched.phone_number && errors.phone_number && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      alignSelf: 'flex-start',
                    }}>
                    {errors.phone_number}
                  </Text>
                )}
                <Text style={styles.label}>{t('sign:email')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    i18n.language === 'ar' ? {textAlign: 'right'} : '',
                  ]}
                  value={values.contact_point}
                  onChangeText={handleChange('contact_point')}
                  onBlur={() => setFieldTouched('contact_point')}
                  autoCapitalize="none"
                  placeholderTextColor={colors.grey.placeholder}
                />
                {touched.contact_point && errors.contact_point && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      alignSelf: 'flex-start',
                    }}>
                    {errors.contact_point}
                  </Text>
                )}

                <View>
                  <Text style={styles.label}>{t('sign:type')}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setAccountType('student');
                        setTypeError(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'white',
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: 'white', ...fonts.cairoSemiBold}}>
                        {t('sign:student')}
                      </Text>
                      <RadioButton
                        value="Gender"
                        status={
                          accountType === 'student' ? 'checked' : 'unchecked'
                        }
                        color="white"
                        uncheckedColor="white"
                        onPress={() => {
                          setAccountType('student');
                          setTypeError(false);
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAccountType('teacher');
                        setTypeError(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'white',
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: 'white', ...fonts.cairoSemiBold}}>
                        {t('sign:teacher')}
                      </Text>
                      <RadioButton
                        value="Gender"
                        status={
                          accountType === 'teacher' ? 'checked' : 'unchecked'
                        }
                        color="white"
                        uncheckedColor="white"
                        onPress={() => {
                          setAccountType('teacher');
                          setTypeError(false);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {account_type_error && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      marginTop: 10,
                      alignSelf: 'flex-start',
                    }}>
                    Select account type
                  </Text>
                )}
                <View>
                  <Text style={styles.label}>{t('sign:gender')}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setGender('Mal');
                        setGenderError(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'white',
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: 'white', ...fonts.cairoSemiBold}}>
                        {t('sign:male')}
                      </Text>
                      <RadioButton
                        value="Gender"
                        status={gender === 'Mal' ? 'checked' : 'unchecked'}
                        color="white"
                        uncheckedColor="white"
                        onPress={() => {
                          setGender('Mal');
                          setGenderError(false);
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGender('Female');
                        setGenderError(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'white',
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: 'white', ...fonts.cairoSemiBold}}>
                        {t('sign:female')}
                      </Text>
                      <RadioButton
                        value="Gender"
                        status={gender === 'Female' ? 'checked' : 'unchecked'}
                        color="white"
                        uncheckedColor="white"
                        onPress={() => {
                          setGender('Female');
                          setGenderError(false);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {gender_error && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      marginTop: 10,
                      alignSelf: 'flex-start',
                    }}>
                    Select gender
                  </Text>
                )}

                <Text style={styles.label}>{t('sign:password')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    i18n.language === 'ar' ? {textAlign: 'right'} : '',
                  ]}
                  value={values.password}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  placeholder="* * * * * * *"
                  onBlur={() => setFieldTouched('password')}
                  placeholderTextColor={colors.grey.placeholder}
                />
                {touched.password && errors.password && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      alignSelf: 'flex-start',
                    }}>
                    {errors.password}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    marginTop: 30,
                    backgroundColor: '#6A2793',
                    padding: 12,
                    borderRadius: 40,
                    borderWidth: 0,
                  }}>
                  {/* <LinearGradient
                    colors={['#e74295', '#7f509b']}
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 1.0}}
                    style={[styles.gradient, {borderRadius: 20}]}
                  /> */}
                  {loading ? (
                    <ActivityIndicator
                      size={'small'}
                      color={colors.white}
                      animating={true}
                    />
                  ) : (
                    <Text
                      style={{
                        color: colors.white,
                        alignSelf: 'center',
                        ...fonts.cairoSemiBold,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {t('sign:sign-up')}
                    </Text>
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    color: colors.white,
                    ...fonts.cairoSemiBold,
                    marginVertical: 10,
                    marginTop: 20,
                    alignSelf: 'flex-start',
                  }}>
                  {t('sign:have-account')}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.push('SignIn')}
                  style={{
                    borderColor: colors.white,
                    borderWidth: 1,
                    padding: 12,
                    borderRadius: 40,
                    marginBottom: 40,
                  }}>
                  {/* <LinearGradient
                    colors={['#e74295', '#7f509b']}
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 1.0}}
                    style={[styles.gradient, {borderRadius: 20}]}
                  /> */}
                  <Text
                    style={{
                      color: colors.white,
                      alignSelf: 'center',
                      ...fonts.cairoSemiBold,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {t('sign:sign-in')}
                  </Text>
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
    backgroundColor: 'transparent',
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  input: {
    ...INPUT_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#eee',
    ...fonts.cairoRegular,
    fontSize: 18,
    color: 'white',

    borderRadius: 0,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 1.84,
    // elevation: 3,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    ...fonts.cairoSemiBold,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
});
