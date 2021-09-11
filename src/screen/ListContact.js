import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Text,
  ToastAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from 'styled-components';
import {connect} from 'react-redux';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import * as r from '../router/_const.config';
import {ContactCard, ModalForm, TextBox, ModalContainer} from './component';
import plus from '../assets/plus.png';
import {
  getListContact,
  deleteContact,
  getDetailContact,
  addContact,
} from '../redux/actions';

const ListContact = props => {
  const {font} = useTheme();
  const [modalVisiable, setModalVisible] = useState(false);
  const [modalDeleteContact, setModalDeletContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState({
    firstName: '',
    lastName: '',
    age: null,
    photo: {uri: 'N/A'},
  });
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deboucnSearch, setDeboucnSearch] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(deboucnSearch);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [deboucnSearch]);

  useEffect(() => {
    const {LOADING_ADD_CONTACT, ERROR_ADD_CONTACT, SUCCESS_ADD_CONTACT} = props;
    if (!loading && !LOADING_ADD_CONTACT && !ERROR_ADD_CONTACT) {
      props.getListContact();
    } else if (ERROR_ADD_CONTACT) {
      ToastAndroid.showWithGravityAndOffset(
        'Something went wrong!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }, [
    loading,
    props.LOADING_ADD_CONTACT,
    props.ERROR_ADD_CONTACT,
    props.SUCCESS_ADD_CONTACT,
  ]);

  useEffect(() => {
    const {
      LOADING_DELETE_CONTACT,
      ERROR_DELETE_CONTACT,
      SUCCESS_DELETE_CONTACT,
    } = props;
    if (!LOADING_DELETE_CONTACT && !ERROR_DELETE_CONTACT) {
      props.getListContact();
    } else if (ERROR_DELETE_CONTACT) {
      ToastAndroid.showWithGravityAndOffset(
        'Something went wrong!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }, [
    props.LOADING_DELETE_CONTACT,
    props.ERROR_DELETE_CONTACT,
    props.SUCCESS_DELETE_CONTACT,
  ]);

  useFocusEffect(
    useCallback(() => {
      props.getListContact();
    }, []),
  );

  const onProfileClick = item => {
    // props.getDetailContact(item.id);
    props.navigation.navigate(r.DETAIL_CONTACT, {contacId: item.id});
  };

  const onAddClick = async () => {
    setModalVisible(false);
    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: addData.photo?.uri,
      type: addData.photo?.type,
      name: addData.photo?.fileName,
    });
    const config = {
      method: 'post',
      url: 'https://api.imgbb.com/1/upload?key=9d9cffbbb8970e59db90fa096e89480e',
      headers: {
        Accept: 'application/json',
      },
      data: formData,
    };
    try {
      const response =
        addData.photo?.type && addData.photo?.fileName && (await axios(config));
      props.addContact({
        ...addData,
        photo: response?.data?.data?.display_url
          ? response?.data?.data?.display_url
          : 'N/A',
      });
    } catch (error) {
      console.log(error);
    }
    setAddData({
      firstName: '',
      lastName: '',
      age: null,
      photo: {uri: 'N/A'},
    });
    setLoading(false);
  };

  const onCancel = () => {
    setAddData({
      firstName: '',
      lastName: '',
      age: null,
      photo: {uri: 'N/A'},
    });
    setModalVisible(false);
  };

  const handleDeleteContact = id => {
    setModalDeletContact(true);
    setDeleteContactId(id);
  };

  const handleConfirmDelete = () => {
    props.deleteContact(deleteContactId);
    setDeleteContactId(null);
    setModalDeletContact(false);
  };

  const handleCancelDelete = () => {
    setModalDeletContact(false);
  };

  return (
    <View style={[styles.container]}>
      {/* Loading Spinner */}
      {loading && <View
        style={{
          backgroundColor: 'rgba(103,134,155, 0.4)',
          position: 'absolute',
          height: hp('94%'),
          width: wp('100%'),
          zIndex: 1000,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#01abe9" />
      </View>}

      {/* Modal Add */}
      <ModalForm
        isVisible={modalVisiable}
        setModal={setModalVisible}
        data={addData}
        setData={setAddData}
        modalTitle="Add Contact"
        onCancel={onCancel}
        onConfirm={onAddClick}
        confirmButton="Add Contact"
      />

      {/* Modal Delete */}
      <ModalContainer
        title="Delete Contact"
        closeModal={() => setModalDeletContact(false)}
        visible={modalDeleteContact}
        height={hp('25%')}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 22, fontFamily: font.Poppins500}}>
            Are You Sure Deleting Contact?
          </Text>
        </View>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            onPress={handleCancelDelete}
            style={[
              styles.button,
              {backgroundColor: '#FFF', borderColor: '#EE2B4E', borderWidth: 2},
            ]}>
            <Text
              style={[
                styles.buttonText,
                {fontFamily: font.Poppins500, color: '#EE2B4E'},
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirmDelete}
            style={[styles.button, {backgroundColor: '#01abe9'}]}>
            <Text style={[styles.buttonText, {fontFamily: font.Poppins500}]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ModalContainer>

      {/* Search Box */}
      <TextBox
        defaultValue={deboucnSearch}
        onChange={val => {
          setDeboucnSearch(val);
        }}
        onClear={() => {setDeboucnSearch("")}}
      />

      {(!loading && props?.list_contact?.length < 1) && (
        <>
          <View style={[styles.card, {zIndex: 100}]}>
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 60, height: 60, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                  <View
                    style={{
                      marginTop: 6,
                      width: 80,
                      height: 20,
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
          <View style={[styles.card]}>
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 60, height: 60, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                  <View
                    style={{
                      marginTop: 6,
                      width: 80,
                      height: 20,
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        </>
      )}

      <FlatList
        data={
          props?.list_contact?.filter(item => {
            return (item.firstName + item.lastName)
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase());
          }) || []
        }
        renderItem={({item}) => (
          <ContactCard
            onLongPress={() => handleDeleteContact(item)}
            onPress={() => onProfileClick(item)}
            data={item}
          />
        )}
        keyExtractor={item => item.id}
        style={{
          height: hp('94%'),
          width: wp('100%'),
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.fab]}>
        <Image source={plus} style={{height: hp('5%'), width: hp('5%')}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('94%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#FFF',
  },
  fab: {
    backgroundColor: '#01abe9',
    height: hp('7%'),
    width: hp('7%'),
    position: 'absolute',
    bottom: 40,
    right: 10,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(36,45,53,0.2)',
    height: hp('94%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
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
});

const mapStateToProps = state => {
  return {
    list_contact: state.contact.list_contact,
    SUCCESS_GET_LIST_CONTACT: state.contact.SUCCESS_GET_LIST_CONTACT,
    LOADING_GET_LIST_CONTACT: state.contact.LOADING_GET_LIST_CONTACT,
    ERROR_GET_LIST_CONTACT: state.contact.ERROR_GET_LIST_CONTACT,
    LOADING_DELETE_CONTACT: state.contact.LOADING_DELETE_CONTACT,
    SUCCESS_DELETE_CONTACT: state.contact.SUCCESS_DELETE_CONTACT,
    ERROR_DELETE_CONTACT: state.contact.ERROR_DELETE_CONTACT,
    LOADING_ADD_CONTACT: state.contact.LOADING_ADD_CONTACT,
    SUCCESS_ADD_CONTACT: state.contact.SUCCESS_ADD_CONTACT,
    ERROR_ADD_CONTACT: state.contact.ERROR_ADD_CONTACT,
  };
};

export default connect(mapStateToProps, {
  getListContact,
  deleteContact,
  getDetailContact,
  addContact,
})(ListContact);
