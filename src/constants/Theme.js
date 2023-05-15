export const COLORS = {
  white100: '#fff',
  white200: '#F7FAF9',
  white300: '#F6F6F6',
  black100: '#000',
  black200: '#181818',
  green200: '#39C7A4',
  gray200: '#939BA3',
  gray300: '#9C9C9C',
  gray400: '#999',
  red200: '#F66D6E',
  blue200: '#E4F2FB',
  pink200: '#F8DBE0',
};

export const FONTS = {
  smallFontSize: 12,
  mediumFontSize: 13,
  normalFontSize: 14,
  largeFontSize: 16,
  largeBold: 18,
  largeBoldx: 19,
  xlargeFontSize: 20,
  xxlargeFontSize: 22,
  xxxlargeFontSize: 25,
};

export const GLOBAL_STYLES = {
  rootContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {flex: 1},
  headingStyle: {
    marginBottom: 10,
    alignSelf: 'center',
    color: COLORS.black100,
    fontSize: FONTS.xxxlargeFontSize,
    fontWeight: 'bold',
  },
  subHeadingStyle: {
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.black100,
    fontSize: FONTS.xlargeFontSize,
    fontWeight: 'bold',
  },
};
