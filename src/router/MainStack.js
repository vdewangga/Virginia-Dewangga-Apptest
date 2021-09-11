import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as r from './_const.config';
import * as s from '../screen';

import Arrow from '../assets/Arrow.png';

const Stack = createStackNavigator();

const paymentMethodOptions = {
  headerBackImage: _ => {
    return (
      <View style={[styles.headerContainer]}>
        <Image source={Arrow} style={[styles.icon]} />
      </View>
    );
  },
  headerTitleAlign: 'center',
  title: 'Detail Contact',
  headerBackTitleVisible: false,
  headerStyle: {height: hp('6%')},
};

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerStyle: {height: hp('6%')},
        headerTitleAlign: 'center',
        title: 'List Contact',
        headerBackTitleVisible: false,
      }}
      name={r.LIST_CONTACT}
      component={s.ListContact}
    />
    <Stack.Screen
      options={paymentMethodOptions}
      name={r.DETAIL_CONTACT}
      component={s.Detail}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#3E4C59',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  icon: {
    tintColor: '#3E4C59',
    height: 22,
    width: 22,
  },
});

export {MainStack};
