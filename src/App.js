import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './router/AppNavigator';
import stores from './redux/stores';
import {ThemeProvider} from 'styled-components';

const theme = {
  colors: {
    text: '#0A0A0A',
    background: '#FFF',
    border: '#E2E8F0',
  },
  font: {
    Poppins100: 'Poppins-Thin',
    Poppins200: 'Poppins-ExtraLight',
    Poppins300: 'Poppins-Light',
    Poppins400: 'Poppins-Regular',
    Poppins500: 'Poppins-Medium',
    Poppins600: 'Poppins-SemiBold',
    Poppins700: 'Poppins-Bold',
    Poppins800: 'Poppins-ExtraBold',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={stores}>
        <AppNavigator />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
