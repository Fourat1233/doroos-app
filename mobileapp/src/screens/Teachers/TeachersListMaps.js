import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors, INPUT_HEIGHT} from '../../assets/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCurrentLocation, usePaginatedFetch} from '../shared/hooks';
import LinearGradient from 'react-native-linear-gradient';

export default TeachersListMapsComponent = () => {
  const mapViewRef = useRef();
  const currentPosition = useCurrentLocation();

  const {
    items: teachers,
    load,
    loading,
    hasMore,
  } = usePaginatedFetch('teachers/load_all');

  useEffect(() => {
    if (currentPosition) {
      mapViewRef.current.animateToRegion(currentPosition, 1);
    }
  }, [currentPosition]);

  const mapMarkers = () => {
    return teachers.map(teacher => (
      <View key={teacher.id}>
        <Text>{teacher.id}</Text>
      </View>
    ));
  };

  const mapLoadedHandler = () => {
    if (currentPosition) {
      let initialRegion = Object.assign({}, currentPosition);
      initialRegion['latitudeDelta'] = 0.005;
      initialRegion['longitudeDelta'] = 0.005;
      mapViewRef.current.animateToRegion(initialRegion, 2000);
    }
  };

  return (
    <LinearGradient
      colors={['#e74595', '#7f519b']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={{...styles.gradient}}>
      <SafeAreaView style={styles.container}>
        <View style={{zIndex: 9999, marginTop: 0}}>
          <TextInput
            placeholder="Search teacher"
            placeholderTextColor="#c2c0c8"
            style={[styles.textInput]}
            autoCorrect={false}
            autoCapitalize={'none'}
            multiline={false}
            editable={true}
            autoFocus={false}
          />
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons
              style={{color: colors.base}}
              name={'md-search'}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          ref={mapViewRef}
          followUserLocation={true}
          onMapReady={mapLoadedHandler}
          style={styles.map}
          initialRegion={currentPosition}>
          {mapMarkers()}
        </MapView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  },
  inputIcon: {
    marginRight: 20,
    paddingHorizontal: 13,
    ...INPUT_HEIGHT,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
