import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import ModalRN from 'react-native-modal';
import {useTheme} from '@react-navigation/native';

export default function BottomUpModal({
  children,
  isModalVisible,
  toggleModal,
  style = {},
  paddingBottom = 0,
  height,
  useOnBackdropPress = false,
  useOnBackButtonPress = false,
  deviceWidth = Dimensions.get('window').width,
  deviceHeight = Dimensions.get('window').height,
  ...props
}) {
  const {colors} = useTheme();
  return (
    <ModalRN
      isVisible={isModalVisible}
      avoidKeyboard={true}
      useNativeDriver={true}
      onBackButtonPress={useOnBackButtonPress ? toggleModal : null}
      onBackdropPress={useOnBackdropPress ? toggleModal : null}
      hideModalContentWhileAnimating
      style={[styles.modalContent, style]}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      {...props}>
      <View
        style={[
          styles.modalCard,
          {paddingBottom: paddingBottom, backgroundColor: colors.card},
          height && {height: height},
        ]}>
        {children}
      </View>
    </ModalRN>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    margin: 0,
    zIndex: 5000,
  },
  modalCard: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
