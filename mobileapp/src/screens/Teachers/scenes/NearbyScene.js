import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {colors, fonts} from '../../../assets/styles/theme';
import {useNormalFetch} from '../../shared/hooks';
import {Teacher} from '../components/Teacher';
import {useNavigation, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import GetLocation from 'react-native-get-location';

export const NearbyScene = () => {
  const {items: teachers, load, loading} = useNormalFetch('teachers/load_all');

  const renderItem = ({item}) => <Teacher teacher={item} />;

  const renderFooter = () => <View style={{height: 50}} />;

  const navigation = useNavigation();

  useEffect(() => {
    //setup();
    load();
  }, []);

  const formatData = (data, numColumns) => {
    let newData = [...data];
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      newData.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return newData;
  };

  const setup = async () => {
    let currentLocation;
    // let currentLocation = await GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    // });
    let user = await AsyncStorage.getItem('user');
    if (!user) {
      navigation.dispatch(StackActions.replace('SignIn'));
      return;
    }
    load();
  };

  return (
    <FlatList
      data={formatData(teachers, 1)}
      renderItem={renderItem}
      style={styles.scene}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});
