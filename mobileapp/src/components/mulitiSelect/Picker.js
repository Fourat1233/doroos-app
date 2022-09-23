import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  TextInput,
  FlatList,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from '@react-navigation/elements';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useTranslation} from 'react-i18next';
import {Item as ItemIcon} from 'react-navigation-header-buttons';
import {colors, fonts, INPUT_HEIGHT} from '../../assets/styles/theme';

const HeaderRight = ({onClickDone}) => (
  <ItemIcon title="done" buttonStyle={styles.button} onPress={onClickDone} />
);
const HeaderLeft = ({onClose}) => (
  <ItemIcon title="close" buttonStyle={styles.button} onPress={onClose} />
);
const HeaderActions = ({children, height}) => (
  <View style={[styles.headerButtons, {height}]}>{children}</View>
);

const Item = React.memo(({item, onCheckItem, checked}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.7}
      underlayColor={colors.grey.light}
      style={styles.item}
      onPress={() => onCheckItem(item)}>
      <>
        <View style={styles.titleContainer}>
          <MaterialIcons
            color={colors.base}
            size={20}
            name="my-location"
            style={styles.locationIcon}
          />
          <Text style={styles.title}>{item.label}</Text>
        </View>
        <View style={[styles.checkBox, {backgroundColor: colors.base}]}>
          {checked && (
            <FontAwesome name="check" color={colors.white} size={14} />
          )}
        </View>
      </>
    </TouchableHighlight>
  );
});

const Picker = ({data, onVisibleChange, checked, setChecked}) => {
  const [searchText, setSearchText] = useState('');

  const headerHeight = useHeaderHeight();
  const {t, i18n} = useTranslation();

  const exist = id => checked.find(itm => itm === id) !== undefined;

  const checkItemHandler = item => {
    if (exist(item.id)) {
      setChecked(checked.filter(checkedItem => checkedItem !== item.id));
    } else {
      setChecked([...checked, item.id]);
    }
  };

  const renderItem = useCallback(
    ({item}) => (
      <Item
        item={item}
        onCheckItem={checkItemHandler}
        checked={exist(item.id)}
      />
    ),
    [exist, checkItemHandler],
  );

  const doneClickHandler = () => {
    onVisibleChange();
  };
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => {
        console.log('testing');
      }}>
      <LinearGradient
        colors={['#e74595', '#7f519b']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradient}>
        <View style={{height: 100}}>
          <View style={{height: getStatusBarHeight()}} />
          <HeaderActions height={100 - getStatusBarHeight()}>
            <HeaderLeft onClose={onVisibleChange} />
            <HeaderRight onClickDone={doneClickHandler} />
          </HeaderActions>
        </View>
        <View style={styles.screenContainer}>
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
              value={searchText}
              onChangeText={value => setSearchText(value)}
            />
          </View>
          <FlatList
            data={data.filter(el =>
              el.label.toLowerCase().includes(searchText.toLowerCase()),
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatlist}
            ListFooterComponent={() => <View />}
            ListFooterComponentStyle={{height: headerHeight}}
          />
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  textInputContainer: {
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
    borderColor: '#eee',
    ...fonts.cairoRegular,
    fontSize: 14,
    marginHorizontal: 20,
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
  flatlist: {
    paddingTop: 10,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  button: {
    ...fonts.cairoBold,
    fontSize: 16,
    color: colors.white,
    textTransform: 'uppercase',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    borderWidth: 0.5,
    borderColor: colors.base,
    height: 25,
    width: 25,
    backgroundColor: colors.white,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.black,
    ...fonts.cairoSemiBold,
    fontSize: 15,
    fontWeight: '500',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationIcon: {
    marginRight: 15,
  },
});

export default Picker;
