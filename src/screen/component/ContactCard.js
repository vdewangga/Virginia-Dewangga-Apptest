import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from 'styled-components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import profile from '../../assets/profile.png';
import close from '../../assets/Close.png';

const ContactCard = ({data, onPress, onLongPress}) => {
  const {font} = useTheme();

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.card]}>
      <View style={[styles.imageContainer]}>
        <Image
          source={data?.photo !== 'N/A' ? {uri: data.photo} : profile}
          style={[styles.image]}
        />
      </View>
      <View>
        <Text style={[styles.nameText, {fontFamily: font.Poppins500}]}>
          {data?.firstName + ' ' + data?.lastName}
        </Text>
        <Text style={[styles.ageText, {fontFamily: font.Poppins200}]}>
          Age: {data?.age}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    width: wp('94%'),
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 12,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    height: hp('8%'),
    width: hp('8%'),
    borderRadius: 90,
  },
  nameText: {
    fontSize: 16,
  },
  ageText: {
    fontSize: 14,
  },
});

export default ContactCard;
