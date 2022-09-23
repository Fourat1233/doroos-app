import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {colors, INPUT_HEIGHT, fonts} from '../../assets/styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {CheckBoxItems} from './components/CheckBoxItems';
import RadioForm from 'react-native-simple-radio-button';
// import { PricingRangeSlider } from './components/range/PricingRangeSlider'
import {ScrollView} from 'react-native-gesture-handler';
import {useDebounce, useSearchQueryFetch} from '../shared/hooks';
import {FormPicker} from '../../components/forms';
import {useSearchDispatch, SET_GENDER, useSearchState} from './context';
import {Teacher} from '../Teachers/components/Teacher';

var radio_props = [
  {label: 'All', value: 0},
  {label: 'Male', value: 1},
  {label: 'Female', value: 2},
];

const Title = ({text}) => {
  const {t} = useTranslation();
  return (
    <Text
      style={{
        ...fonts.cairoBold,
        fontSize: 15,
        alignSelf: 'flex-start',
        paddingBottom: 3,
        paddingTop: 10,
        color: 'black',
      }}>
      {t(text)}
    </Text>
  );
};

const FieldWrapper = ({children, style}) => {
  return (
    <View
      style={[
        {
          borderWidth: 0.5,
          borderColor: '#dfe1e5',
          justifyContent: 'center',
          height: 55,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export const SearchScreen = () => {
  const {
    load: loadFetchSearch,
    loading,
    items: teachers,
  } = useSearchQueryFetch('/teachers/filter');

  const [searchTerm, setSearchTerm] = useState('');

  const [subjects, setSubjectItem] = useState([]);

  const checkSubjectItemHandler = item => {};
  const isMounted = useRef(false);

  const dispatch = useSearchDispatch();
  const {gender} = useSearchState();

  const {t, i18n} = useTranslation();

  const navigation = useNavigation();

  const pressGenderHandler = value =>
    dispatch({type: SET_GENDER, payload: value});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('screens:search'),
      // headerLeft: () => {
      //     return (
      //         <TouchableOpacity
      //             style={{ paddingHorizontal: 15 }}
      //             onPress={() => navigation.toggleDrawer()}
      //         >
      //             <Feather name="menu" color={colors.white} size={20} />
      //         </TouchableOpacity>
      //     )
      // }
    });
  }, [navigation]);

  const handleSearch = () => {
    loadFetchSearch(
      searchTerm,
      subjects,
      gender === 1 ? 'Male' : gender === 2 ? 'Female' : null,
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e74295', '#7f509b']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradient}
      />
      <View style={styles.screenContainer}>
        <ScrollView>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={t('search:key')}
              placeholderTextColor="#c2c0c8"
              style={[
                styles.textInput,
                i18n.language === 'ar' ? {textAlign: 'right'} : '',
              ]}
              autoCorrect={false}
              autoCapitalize={'none'}
              multiline={false}
              editable={true}
              autoFocus={false}
              onChangeText={setSearchTerm}
            />
          </View>
          <View>
            <Title text={'search:choose'} />
            <FieldWrapper>
              <FormPicker
                onCheckItemHandler={id => setSubjectItem([...subjects, id])}
              />
            </FieldWrapper>
          </View>
          <View>
            <Title text={'search:gender'} />
            <FieldWrapper>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                buttonColor={colors.base}
                buttonSize={18}
                labelColor={'#525251'}
                style={styles.radioForm}
                onPress={pressGenderHandler}
                selectedButtonColor={colors.base}
                radioStyle={styles.radioStyle}
              />
            </FieldWrapper>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => (!loading ? handleSearch() : null)}
              style={{
                marginTop: 20,
                backgroundColor: '#6A2793',
                padding: 12,
                borderRadius: 40,
                borderWidth: 0,
                marginBottom: 50,
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
                  {t('general:confirm')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={[styles.searchButton]}>
                        {loading ?
                            (<ActivityIndicator color={colors.white} />) :
                            (<Text style={styles.searchButtonText}>{t('search:key')}{resultCount}</Text>)
                        }
                    </TouchableOpacity> */}

          <View style={styles.teachersContainer}>
            {teachers.map((teacher, index) => (
              <Teacher key={`t-${index}`} teacher={teacher} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  screenContainer: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    paddingTop: 0,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  textInputContainer: {
    marginBottom: 5,
    marginTop: 20,
  },
  textInput: {
    ...INPUT_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    backgroundColor: colors.white,
    borderWidth: 0.25,
    ...fonts.cairoRegular,
    borderColor: '#eee',
    fontSize: 14,
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
    ...INPUT_HEIGHT,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioForm: {justifyContent: 'space-around'},
  radioStyle: {marginBottom: 0},
  searchButton: {
    paddingHorizontal: 20,
    padding: 7,
    backgroundColor: colors.base,
    borderRadius: 40,
    margin: 5,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: colors.white,
    ...fonts.cairoSemiBold,
    alignSelf: 'center',
    fontSize: 18,
  },
  teachersContainer: {
    backgroundColor:'white',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginBottom: 50,
    paddingBottom: 1,
  },
});
