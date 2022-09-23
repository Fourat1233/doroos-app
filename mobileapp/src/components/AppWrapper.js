import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  NativeModules,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {colors} from '../assets/styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const platformBehavor = function () {
  return Platform.select({ios: 'padding', android: 'height'});
};

const {StatusBarManager} = NativeModules;

export default AppWrapper = props => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [keyboardHeigh, setKeyboardHeight] = useState(0);

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBar => {
        setStatusBarHeight(statusBar.height);
      });
    }
  });

  _keyboardDidShow = e => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  _getOffset = () => {
    const headerHeight = props.header
      ? Platform.select({ios: 44, android: 56})
      : 0;
    const offsetHeight = Platform.select({
      ios: () => (props.header ? statusBarHeight + headerHeight : 0),
      android: () => StatusBar.currentHeight + headerHeight,
    })();
    return offsetHeight;
  };

  const {children, containerStyles = {}, scrollableStyles = {}} = props;
  return (
    <LinearGradient
      colors={[
        props.backgroundColor ?? '#e74595',
        props.backgroundColor ?? '#7f519b',
      ]}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={{...appStyles.gradient}}>
      <KeyboardAvoidingView
        enabled
        behavior={platformBehavor()}
        style={[
          appStyles.container,
          containerStyles,
          {
            /*backgroundColor: colors.white*/
          },
        ]}
        keyboardVerticalOffset={this._getOffset()}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              appStyles.scrollableContainer,
              {...scrollableStyles},
            ]}>
            {children}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollableContainer: {flexGrow: 1, justifyContent: 'center'},
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
