import React from 'react';
import {
  useWindowDimensions,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {useTheme} from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomUpModal from './BottomUpModal';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ModalContainer = ({
  visible,
  closeModal,
  children,
  height,
  useOnBackButtonPress = true,
  useOnBackdropPress = true,
  title,
  scrollable = true,
  modalStyle = {},
}) => {
  const dimensions = useWindowDimensions();
  const {colors} = useTheme();
  return (
    <BottomUpModal
      useOnBackButtonPress={useOnBackButtonPress}
      useOnBackdropPress={useOnBackdropPress}
      isModalVisible={visible}
      toggleModal={closeModal}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <View
          style={[
            {
              height: height ? height : hp(50),
              width: dimensions.width,
              backgroundColor: colors.card,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: 'transparent',
              paddingHorizontal: 16,
              paddingTop: 16,
            },
            modalStyle,
          ]}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={closeModal} style={{marginRight: 10}}>
              <Icon name={'close'} size={24} color={'#3E4C59'} />
            </TouchableOpacity>
            {title !== undefined && (
              <Text style={styles.title} type={'label'}>
                {title}
              </Text>
            )}
          </View>
          {scrollable ? (
            <ScrollView
              style={{flex: 1}}
              bounces={false}
              contentContainerStyle={{}}>
              {children}
            </ScrollView>
          ) : (
            <View style={{flex: 1}}>{children}</View>
          )}
        </View>
      </View>
    </BottomUpModal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  buttonSeparator: {
    width: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
});
