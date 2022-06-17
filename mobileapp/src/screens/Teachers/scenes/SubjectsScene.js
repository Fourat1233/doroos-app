import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, FlatList} from 'react-native';
import {colors, fonts} from '../../../assets/styles/theme';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {usePaginatedFetch} from '../../shared/hooks';

const numColumns = 2;

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

export const SubjectsScene = () => {
  const {
    items: subjects,
    load,
    loading,
  } = usePaginatedFetch('subjects/load_all');
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    load();
  }, []);

  return (
    <FlatList
      data={formatData(subjects, numColumns)}
      style={styles.container}
      renderItem={({item}) => {
        if (item.empty === true) {
          return (
            <View
              style={[styles.item, styles.itemInvisible, {borderWidth: 0}]}
            />
          );
        }
        return (
          <RectButton
            style={[styles.item, {position: 'relative'}]}
            onPress={() =>
              navigation.navigate('BySubject', {
                subjectId: item.id,
                subjectName: item.name,
              })
            }>
            <Image
              style={styles.icon}
              source={{
                uri: `http://143.110.210.169:8000/uploads/subjects/${item.icon_url}`,
              }}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{...fonts.cairoBold, marginBottom: 5, color: 'black'}}>
              {i18n.language === 'ar' ? item.ar_name : item.name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{...fonts.cairoSemiBold, color: colors.grey.placeholder}}>
              {i18n.language === 'ar'
                ? item.category.ar_name
                : item.category.name}
            </Text>
          </RectButton>
        );
      }}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 5,
    marginVertical: 10,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.grey.medium,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
});
