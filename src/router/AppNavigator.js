import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainStack} from './MainStack';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function AppNavigator() {
  return (
    <>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </>
  );
}

export default AppNavigator;
