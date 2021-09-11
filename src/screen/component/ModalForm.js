import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from 'styled-components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {ModalContainer, Input} from './index';
import profile from '../../assets/profile.png';

const ModalForm = ({
  modalTitle,
  setData,
  confirmButton,
  onCancel,
  onConfirm,
  setModal,
  isVisible,
  data,
}) => {
  const {font} = useTheme();
  const [photoModa, setPhotoModal] = useState(false);
  const [isError, setError] = useState({
    firstName: false,
    lastName: false,
    age: false,
  });
  const changeLastName = value => {
    setData(prev => {
      return {
        ...prev,
        lastName: value,
      };
    });
  };

  const changeFirstName = value => {
    setData(prev => {
      return {
        ...prev,
        firstName: value,
      };
    });
  };

  const changeAge = value => {
    setData(prev => {
      return {
        ...prev,
        age: value,
      };
    });
  };

  const onGalleryOpen = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      e => {
        if (e?.didCancel !== true) {
          setData(prev => {
            return {
              ...prev,
              photo: e?.assets?.[0],
            };
          });
          setPhotoModal(false);
        }
      },
    );
  };

  const onCameraOpen = () => {
    launchCamera(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      e => {
        if (e?.didCancel !== true) {
          setData(prev => {
            return {
              ...prev,
              photo: e?.assets?.[0],
            };
          });
          setPhotoModal(false);
        }
      },
    );
  };

  const handleConfirmButton = () => {
    const error = {
      firstName: true,
      lastName: true,
      age: true,
    };
    if (data.firstName?.length > 3) {
      error.firstName = false;
    }

    if (data.lastName?.length > 3) {
      error.lastName = false;
    }

    if (data?.age != null && data.age < 100) {
      error.age = false;
    }

    setError(error);

    if (!error.firstName && !error.lastName && !error.age) {
      onConfirm();
    }
  };

  return (
    <ModalContainer
      closeModal={() => setModal(false)}
      title={modalTitle}
      visible={isVisible}
      scrollable={true}
      height={hp('62%')}>
      <TouchableOpacity
        onPress={() => {
          setPhotoModal(true);
        }}>
        <Image
          style={[styles.image]}
          source={
            data?.photo?.uri !== 'N/A' ? {uri: data?.photo?.uri} : profile
          }
        />
      </TouchableOpacity>
      <Text style={{color: '#6B7580', fontFamily: font.Poppins500}}>
        First Name
      </Text>
      <Input
        changeText={e => {
          changeFirstName(e);
        }}
        defaultValue={data?.firstName}
        placeholder="Input First Name"
        keyboardType="ascii-capable"
        isError={isError.lastName}
        errorMessage={'First Name Cannot Be Empty or Less Then 4 Character'}
      />
      <Text style={{color: '#6B7580', fontFamily: font.Poppins500}}>
        Last Name
      </Text>
      <Input
        changeText={e => {
          changeLastName(e);
        }}
        defaultValue={data?.lastName}
        placeholder="Input Last Name"
        keyboardType="ascii-capable"
        isError={isError.lastName}
        errorMessage={'Last Name Cannot Be Empty or Less Then 4 Character'}
      />
      <Text style={{color: '#6B7580', fontFamily: font.Poppins500}}>Age</Text>
      <Input
        changeText={e => {
          changeAge(e);
        }}
        defaultValue={data?.age?.toString()}
        placeholder="Input Age"
        isError={isError.age}
        errorMessage={'Age Cannot Be Empty or More Then 100'}
      />
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity
          onPress={() => {
            onCancel(),
              setError({firstName: false, lastName: false, age: false});
          }}
          style={[styles.button]}>
          <Text
            style={{fontSize: 16, fontFamily: font.Poppins500, color: '#fff'}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleConfirmButton();
          }}
          style={[styles.button, {backgroundColor: '#01abe9'}]}>
          <Text
            style={{fontSize: 16, fontFamily: font.Poppins500, color: '#fff'}}>
            {confirmButton}
          </Text>
        </TouchableOpacity>
      </View>

      <ModalContainer
        visible={photoModa}
        closeModal={() => {
          setPhotoModal(false);
        }}
        height={hp('20%')}
        title="Photo">
        <TouchableOpacity
          onPress={onGalleryOpen}
          style={{marginVertical: hp('1%')}}>
          <Text style={[styles.modalText, {fontFamily: font.Poppins500}]}>
            Choose photo from Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCameraOpen}
          style={{marginVertical: hp('1%')}}>
          <Text style={[styles.modalText, {fontFamily: font.Poppins500}]}>
            Take Photo
          </Text>
        </TouchableOpacity>
      </ModalContainer>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp('12%'),
    width: hp('12%'),
    borderRadius: 90,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    height: 42,
    width: wp('44%'),
    backgroundColor: '#EE2B4E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
});

export default ModalForm;
