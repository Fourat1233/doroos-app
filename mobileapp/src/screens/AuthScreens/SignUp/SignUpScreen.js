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
import {Avatar, RadioButton} from 'react-native-paper';
import {AuthContext} from '../context';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {register, useLocations, useSubjects} from '../../shared/hooks';
import MultiSelect from '../../../components/mulitiSelect/MultiSelect';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input';
// import ButtonToggleGroup from 'react-native-button-toggle-group';

export default function SignUpComponent() {
  const authStore = useContext(AuthContext);
  const [accountType, setAccountType] = React.useState('student');
  const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();
  // const [file, setFile] = useState(null);
  // const [filePath, setFilePath] = useState(null);
  // const [fileError, setFileError] = useState(false);

  const {locations, loading: locationsLoading} = useLocations();
  const {subjects: allSubjects, loading: subjectsLoading} = useSubjects();

  const _handleSubmit = async values => {
    let studentFields = [
      'full_name',
      'arabic_name',
      'contact_point',
      'password',
      'phone_number',
      'gender',
    ];
    let data = {
      ...(accountType === 'teacher'
        ? values
        : studentFields.reduce(
            (previous, current) => ({
              ...previous,
              [current]: values[current],
            }),
            {},
          )),
    };
    let error = await register(
      accountType === 'student'
        ? '/gate/createStudentAccount'
        : '/gate/createTeacherAccount',
      data,
    );
    if (error) {
      setLoading(false);
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return;
    }
    navigation.navigate('SignIn');
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('sign:sign-up'),
    });
  }, [navigation]);

  // const changePicture = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const pickedResponse = await ImagePicker.openPicker({
  //         cropping: true,
  //         multiple: false,
  //         mediaType: 'photo',
  //         includeBase64: true,
  //       });
  //       if (pickedResponse.size > 1024 * 1024) {
  //         setFileError(true);
  //         return;
  //       }
  //       setFileError(false);
  //       let file = dataURLtoFile(
  //         `data:${pickedResponse.mime};base64,${pickedResponse.data}`,
  //         `file.${pickedResponse.path.split('.').reverse()[0]}`,
  //       );
  //       setFilePath(pickedResponse.path);
  //       setFile(file);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       const pickedResponse = await ImagePicker.openPicker({
  //         cropping: true,
  //         multiple: false,
  //         mediaType: 'photo',
  //       });
  //       let attachment = {
  //         uri: pickedResponse.path,
  //         name: pickedResponse.filename,
  //         type: pickedResponse.mime,
  //       };
  //       setFile(attachment.uri);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.body}>
        <AppWrapper
          header={true}
          backgroundColor={accountType === 'teacher' ? '#e74595' : '#7f519b'}>
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
              arabic_name: '',
              contact_point: '',
              password: '',
              phone_number: '',
              gender: 'Mal',
              about: '',
              city: undefined,
              years_of_experience: 0,
              pricing: 0,
              teaching_areas: [],
              teaching_type: [],
              teaching_level: [],
              subjects: [],
            }}
            onSubmit={values => _handleSubmit(values)}
            validationSchema={yup.object().shape({
              full_name: yup.string().required(),
              arabic_name: yup.string().required(),
              contact_point: yup.string().email().required(),
              password: yup.string().required().min(6),
              phone_number: yup.string().required(),
              gender: yup.string().required(),
              ...(accountType === 'teacher'
                ? {
                    about: yup.string().required().min(20),
                    city: yup.number().required(),
                    years_of_experience: yup
                      .number()
                      .required()
                      .integer()
                      .min(0),
                    pricing: yup.number().required().min(0),
                    teaching_areas: yup.array().required().min(1),
                    teaching_type: yup.array().required().min(1),
                    teaching_level: yup.array().required().min(1),
                    subjects: yup.array().min(1),
                  }
                : {}),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              setFieldValue,
            }) => (
              <View style={{paddingHorizontal: 20}}>
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
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAccountType('teacher');
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
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
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
                <Text style={styles.label}>{t('sign:ar_name')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    i18n.language === 'ar' ? {textAlign: 'right'} : '',
                  ]}
                  value={values.arabic_name}
                  onChangeText={handleChange('arabic_name')}
                  onBlur={() => setFieldTouched('arabic_name')}
                  placeholderTextColor={colors.grey.placeholder}
                />
                {touched.arabic_name && errors.arabic_name && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      alignSelf: 'flex-start',
                    }}>
                    {errors.arabic_name}
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
                  <Text style={styles.label}>{t('sign:gender')}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue('gender', 'Mal', true);
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
                        status={
                          values.gender === 'Mal' ? 'checked' : 'unchecked'
                        }
                        color="white"
                        uncheckedColor="white"
                        onPress={() => {
                          setFieldValue('gender', 'Mal', true);
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue('gender', 'Female', true);
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
                        status={
                          values.gender === 'Female' ? 'checked' : 'unchecked'
                        }
                        color="white"
                        uncheckedColor="white"
                        onPress={() => {
                          setFieldValue('gender', 'Female', true);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.gender && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      marginTop: 10,
                      alignSelf: 'flex-start',
                    }}>
                    {errors.gender}
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

                {/* <Text style={styles.label}>{t('sign:file')}</Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    borderWidth: 2,
                    borderRadius: 10,
                    height: 174,
                    position: 'relative',
                  }}
                  onPress={() => changePicture()}>
                  {file && filePath ? (
                    <Image
                      source={{uri: filePath}}
                      style={{height: 170}}
                      resizeMode="contain"
                    />
                  ) : (
                    <View
                      style={{
                        height: 170,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>{t('sign:pick-file')}</Text>
                    </View>
                  )}
                  {filePath && file && (
                    <TouchableOpacity
                      style={{
                        color: 'white',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                      onPress={() => {
                        setFile(null);
                        setFilePath(null);
                      }}>
                      <Ionicons color="white" name={'md-trash'} size={24} />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
                {fileError && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: 'red',
                      alignSelf: 'flex-start',
                    }}>
                    {'max file size is 1 Mb'}
                  </Text>
                )} */}

                {accountType === 'teacher' && (
                  <>
                    <Text style={styles.label}>{t('sign:about')}</Text>
                    <TextInput
                      style={[
                        {...styles.inputMulti},
                        i18n.language === 'ar' ? {textAlign: 'right'} : '',
                      ]}
                      value={values.about}
                      onChangeText={handleChange('about')}
                      onBlur={() => setFieldTouched('about')}
                      placeholderTextColor={colors.grey.placeholder}
                      multiline
                    />
                    {touched.about && errors.about && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.about}
                      </Text>
                    )}

                    <Text style={styles.label}>{t('sign:city')}</Text>
                    <View
                      style={[
                        {
                          marginTop: 10,
                          borderWidth: 0.5,
                          borderColor: '#dfe1e5',
                          justifyContent: 'center',
                          height: 55,
                        },
                      ]}>
                      <Picker
                        selectedValue={values.city}
                        onValueChange={(value, index) => {
                          console.log(value);
                          console.log(typeof value);
                          setFieldValue('city', value, true);
                        }}
                        style={{color: 'white'}}>
                        {[
                          {address: 'please select a value', value: null},
                          ...locations,
                        ].map((location, index) => (
                          <Picker.Item
                            key={index}
                            label={location.address}
                            value={location.id}
                          />
                        ))}
                      </Picker>
                    </View>
                    {errors.city && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.city}
                      </Text>
                    )}

                    <Text style={styles.label}>
                      {t('sign:years-of-experience')}
                    </Text>
                    <NumericInput
                      value={values.years_of_experience}
                      onChange={value => {
                        setFieldValue('years_of_experience', value, true);
                      }}
                      step={1}
                      minValue={0}
                      valueType={'integer'}
                      type="up-down"
                      rounded={true}
                      borderColor="white"
                      textColor="white"
                      upDownButtonsBackgroundColor="transparent"
                      containerStyle={{
                        marginTop: 20,
                        backgroundColor: 'transparent',
                      }}
                      iconStyle={{
                        color: 'white',
                        backgroundColor: 'transparent',
                      }}
                    />
                    {errors.years_of_experience && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.years_of_experience}
                      </Text>
                    )}

                    <Text style={styles.label}>{t('sign:pricing')}</Text>
                    <NumericInput
                      value={values.pricing}
                      onChange={value => {
                        setFieldValue('pricing', value, true);
                      }}
                      step={0.1}
                      minValue={0}
                      valueType="real"
                      type="up-down"
                      rounded={true}
                      borderColor="white"
                      textColor="white"
                      upDownButtonsBackgroundColor="transparent"
                      containerStyle={{
                        marginTop: 20,
                        backgroundColor: 'transparent',
                      }}
                      iconStyle={{
                        color: 'white',
                        backgroundColor: 'transparent',
                      }}
                    />
                    {errors.pricing && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.pricing}
                      </Text>
                    )}

                    <Text style={styles.label}>{t('sign:teaching-areas')}</Text>
                    <View
                      style={[
                        {
                          marginTop: 10,
                          borderWidth: 0.5,
                          borderColor: '#dfe1e5',
                          justifyContent: 'center',
                          height: 55,
                        },
                      ]}>
                      <MultiSelect
                        data={locations.map(el => ({
                          label: el.address,
                          id: el.id,
                        }))}
                        checked={values.teaching_areas}
                        setChecked={value => {
                          setFieldValue('teaching_areas', value, true);
                        }}
                      />
                    </View>
                    {errors.teaching_areas && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.teaching_areas}
                      </Text>
                    )}

                    <Text style={styles.label}>{t('sign:teaching-type')}</Text>
                    <View
                      style={[
                        {
                          marginTop: 10,
                          borderWidth: 0.5,
                          borderColor: '#dfe1e5',
                          justifyContent: 'center',
                          height: 55,
                        },
                      ]}>
                      <MultiSelect
                        data={[
                          {id: 'Home', label: 'Home'},
                          {id: 'Remote', label: 'Remote'},
                        ]}
                        checked={values.teaching_type}
                        setChecked={value => {
                          setFieldValue('teaching_type', value, true);
                        }}
                      />
                    </View>
                    {errors.teaching_type && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.teaching_type}
                      </Text>
                    )}

                    <Text style={styles.label}>{t('sign:teaching-level')}</Text>
                    <View
                      style={[
                        {
                          marginTop: 10,
                          borderWidth: 0.5,
                          borderColor: '#dfe1e5',
                          justifyContent: 'center',
                          height: 55,
                        },
                      ]}>
                      <MultiSelect
                        data={[
                          {id: 'Primary', label: 'Primary'},
                          {id: 'Secondary', label: 'Secondary'},
                        ]}
                        checked={values.teaching_level}
                        setChecked={value => {
                          setFieldValue('teaching_level', value, true);
                        }}
                      />
                    </View>
                    {errors.teaching_level && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.teaching_level}
                      </Text>
                    )}

                    <Text style={styles.label}>{t('sign:subjects')}</Text>
                    <View
                      style={[
                        {
                          marginTop: 10,
                          borderWidth: 0.5,
                          borderColor: '#dfe1e5',
                          justifyContent: 'center',
                          height: 55,
                        },
                      ]}>
                      <MultiSelect
                        data={allSubjects.map(el => ({
                          label: el.name,
                          id: el.id,
                        }))}
                        checked={values.subjects}
                        setChecked={value => {
                          setFieldValue('subjects', value, true);
                        }}
                      />
                    </View>
                    {errors.subjects && (
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'flex-start',
                        }}>
                        {errors.subjects}
                      </Text>
                    )}
                  </>
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
  inputMulti: {
    minHeight: INPUT_HEIGHT.height,
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
