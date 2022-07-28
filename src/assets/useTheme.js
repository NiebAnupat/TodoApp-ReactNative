import { extendTheme } from 'native-base';

const theme = extendTheme({
      fontConfig: {
        Kanit: {
          100: {
            normal: 'Kanit-Thin',
            italic: 'Kanit-ThinItalic',
          },
          200: {
            normal: 'Kanit-ExtraLight',
            italic: 'Kanit-ExtraLightItalic',
          },
          300: {
            normal: 'Kanit-Light',
            italic: 'Kanit-LightItalic',
          },
          400: {
            normal: 'Kanit-Regular',
            italic: 'Kanit-RegularItalic',
          },
          500: {
            normal: 'Kanit-Medium',
            italic: 'Kanit-MediumItalic',
          },
          600: {
            normal: 'Kanit-SemiBold',
            italic: 'Kanit-SemiBoldItalic',
          },
          700: {
            normal: 'Kanit-Bold',
            italic: 'Kanit-BoldItalic',
          },
          800: {
            normal: 'Kanit-ExtraBold',
            italic: 'Kanit-ExtraBoldItalic',
          },
          900: {
            normal: 'Kanit-Black',
            italic: 'Kanit-BlackItalic',
          },
        },
      },
    
      fonts: {
        heading: 'Kanit',
        body: 'Kanit',
        mono: 'Kanit',
      },
    });

    export default theme;
