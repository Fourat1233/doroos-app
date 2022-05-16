import {Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const INPUT_HEIGHT = Platform.select({
  ios: {
    height: RFValue(42),
  },
  android: {
    height: RFValue(44),
  },
});
const INPUT_FONT_SIZE = Platform.select({
  ios: {
    fontSize: RFValue(14),
  },
  android: {
    fontSize: RFValue(16),
  },
});

const colors = {
  base: '#8E68AD',
  primary: '#00B5FC',
  danger: '#C83B00',
  warning: '#FBC90B',
  success: '#24D36B',
  black: '#323643',
  white: '#FFFFFF',
  grey: {
    light: '#F2F3F5',
    dark: '#D6D6D6',
    medium: '#F0F0F0',
    placeholder: '#a9a6a6',
  },
  background: '#F0F0F0',
};

const fonts = {
  regular: {
    fontFamily: 'Lato-Regular',
  },
  black: {
    fontFamily: 'Lato-Black',
  },
  bold: {
    fontFamily: 'Lato-Bold',
  },
  light: {
    fontFamily: 'Lato-Light',
  },
  thin: {
    fontFamily: 'Lato-Thin',
  },
  cairoRegular: {
    fontFamily: 'Cairo-Regular',
  },
  cairoBlack: {
    fontFamily: 'Cairo-Black',
  },
  cairoBold: {
    fontFamily: 'Cairo-Bold',
  },
  cairoSemiBold: {
    fontFamily: 'Cairo-SemiBold',
  },
  cairoLight: {
    fontFamily: 'Cairo-Light',
  },
};

// const font = {
// 	book: {
// 		fontFamily: 'Avenir-Book'
// 	},
// 	heavy: {
// 		fontFamily: 'Avenir-Heavy'
// 	},
// 	light: {
// 		fontFamily: 'Avenir-Light'
// 	},
// 	medium: {
// 		fontFamily: 'Avenir-Medium'
// 	},
// 	roman: {
// 		fontFamily: 'Avenir-Roman'
// 	}
// };

export {
  colors,
  fonts,
  // font,
  INPUT_HEIGHT,
  INPUT_FONT_SIZE,
};
