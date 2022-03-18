import React from 'react';
import { StyleSheet, View, ImageBackground, StatusBar, Image } from 'react-native';
import { colors } from '../../assets/styles/theme';
import { DotIndicator } from 'react-native-indicators'

export default AuthLoadingComponent = () => {
  return (
    <ImageBackground source={require('../../assets/images/bg-welcome.png')} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.base}
        networkActivityIndicatorVisible={true}
        hidden={false}
      />
      <View>
        <Image source={require('../../assets/images/white_logo_doroos.png')} />
        <View style={{ marginTop: 30, marginLeft: 5, height: 10, alignItems: 'center' }}>
          <DotIndicator color='white' size={5} animationDuration={900} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});