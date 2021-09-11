import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import close from '../../assets/Close.png';
import search from '../../assets/Search.png';

const TextBox = ({defaultValue, onChange, onClear}) => {
  return (
    <View style={[styles.container]}>
      <View>
        <Image source={search} style={[styles.icon]} />
      </View>
      <TextInput
        defaultValue={defaultValue}
        onChangeText={val => onChange?.(val)}
        placeholder={'Cari Kontak'}
        style={[styles.textinput]}
      />
      <TouchableOpacity onPress={onClear}>
        <Image source={close} style={[styles.icon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01abe9',
    flexDirection: 'row',
    width: wp('94%'),
    alignSelf: 'center',
    height: hp('5%'),
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textinput: {
    backgroundColor: '#01abe9',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    textAlignVertical: 'center',
  },
  icon: {
    tintColor: '#FFF',
    height: 24,
    width: 24,
  },
});

export default TextBox;
