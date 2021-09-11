import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from 'styled-components';
import {connect} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';

import profile from '../assets/profile.png';
import edit from '../assets/edit.png';
import {ModalForm} from './component';
import {editContact, getDetailContact, resetGetDetail} from '../redux/actions';

const Detail = props => {
  const {font} = useTheme();
  const [modalVisiable, setModalVisible] = useState(false);
  const [data, setData] = useState({
    ...props.detail_contact,
    photo: {uri: props.detail_contact.photo},
  });

  useEffect(() => {
    setData({
      ...props.detail_contact,
      photo: {uri: props.detail_contact.photo},
    });
  }, [JSON.stringify(props.detail_contact)]);

  useEffect(() => {
    props.getDetailContact(props?.route?.params?.contacId);
    return () => {
      props.resetGetDetail();
    };
  }, []);

  useEffect(() => {
    const {LOADING_EDIT_CONTACT, SUCCESS_EDIT_CONTACT, ERROR_EDIT_CONTACT} =
      props;
    if (!LOADING_EDIT_CONTACT && SUCCESS_EDIT_CONTACT && !ERROR_EDIT_CONTACT) {
      props.getDetailContact(props?.route?.params?.contacId);
    } else if (ERROR_EDIT_CONTACT) {
      ToastAndroid.showWithGravityAndOffset(
        'Something went wrong!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }, [
    props.LOADING_EDIT_CONTACT,
    props.SUCCESS_EDIT_CONTACT,
    props.ERROR_EDIT_CONTACT,
  ]);

  const onConfirmEdit = async () => {
    setModalVisible(false);
    const formData = new FormData();
    formData.append('image', {
      uri: data.photo?.uri,
      type: data.photo?.type,
      name: data.photo?.fileName,
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
        data.photo?.type && data.photo?.fileName && (await axios(config));
      props.editContact({
        ...data,
        photo: response?.data?.data?.display_url
          ? response?.data?.data?.display_url
          : props.detail_contact?.photo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelEdit = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container]}>
      <ModalForm
        isVisible={modalVisiable}
        setModal={setModalVisible}
        data={data}
        setData={setData}
        modalTitle="Edit Contact"
        onCancel={onCancelEdit}
        onConfirm={onConfirmEdit}
        confirmButton="Edit Contact"
      />
      <View style={[styles.textContainer]}>
        <View style={[styles.subTextContainer]}>
          {props.detail_contact.firstName || props.detail_contact.lastName ? (
            <>
              <Text style={[styles.text, {fontFamily: font.Poppins600}]}>
                {props.detail_contact.firstName +
                  ' ' +
                  props.detail_contact.lastName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Image
                  source={edit}
                  style={{
                    tintColor: '#67869B',
                    width: 24,
                    height: 24,
                    marginHorizontal: 8,
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignSelf="center"
                alignItems="center">
                <SkeletonPlaceholder.Item
                  width={180}
                  height={24}
                  borderRadius={8}
                  marginRight={6}
                />
                <SkeletonPlaceholder.Item
                  width={25}
                  height={25}
                  borderRadius={6}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          )}
        </View>
        <View style={[styles.detailText]}>
          {props.detail_contact.age ? (
            <View>
              <Text style={[styles.subText, {fontFamily: font.Poppins300}]}>
                Age
              </Text>
              <Text style={{fontFamily: font.Poppins500, fontSize: 18}}>
                {props.detail_contact.age}
              </Text>
            </View>
          ) : (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={40}
                height={20}
                borderRadius={8}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width={50}
                height={20}
                borderRadius={8}
              />
            </SkeletonPlaceholder>
          )}

          {props.detail_contact.firstName ? (
            <View>
              <Text style={[styles.subText, {fontFamily: font.Poppins300}]}>
                First Name
              </Text>
              <Text style={{fontFamily: font.Poppins500, fontSize: 18}}>
                {props.detail_contact.firstName}
              </Text>
            </View>
          ) : (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={60}
                height={20}
                borderRadius={8}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={20}
                borderRadius={8}
              />
            </SkeletonPlaceholder>
          )}

          {props.detail_contact.lastName ? (
            <View>
              <Text style={[styles.subText, {fontFamily: font.Poppins300}]}>
                Last Name
              </Text>
              <Text style={{fontFamily: font.Poppins500, fontSize: 18}}>
                {props.detail_contact.lastName}
              </Text>
            </View>
          ) : (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={60}
                height={20}
                borderRadius={8}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={20}
                borderRadius={8}
              />
            </SkeletonPlaceholder>
          )}
        </View>
      </View>
      <View style={[styles.imageContainer]}>
        {props?.detail_contact?.photo ? (
          <Image
            style={[styles.image]}
            source={
              props.detail_contact?.photo !== 'N/A'
                ? props?.detail_contact?.photo != undefined
                  ? {uri: props.detail_contact.photo}
                  : profile
                : profile
            }
          />
        ) : (
          <SkeletonPlaceholder speed={600}>
            <SkeletonPlaceholder.Item
              width={wp('35%')}
              height={wp('35%')}
              borderRadius={90}
            />
          </SkeletonPlaceholder>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01abe9',
    height: hp('94%'),
  },
  textContainer: {
    backgroundColor: '#FFF',
    height: hp('80%'),
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingHorizontal: wp('4%'),
  },
  imageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: hp('5%'),
    borderColor: '#01abe9',
    borderWidth: 10,
    borderRadius: 90,
  },
  image: {
    height: wp('35%'),
    width: wp('35%'),
    borderRadius: 90,
  },
  subTextContainer: {
    marginTop: hp('15%'),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  detailText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  subText: {
    fontSize: 12,
    color: '#a4a5a6',
    marginBottom: 6,
  },
});

const mapStateToProps = state => {
  return {
    detail_contact: state.contact.detail_contact,
    SUCCESS_GET_DETAIL_CONTACT: state.contact.SUCCESS_GET_DETAIL_CONTACT,
    LOADING_GET_DETAIL_CONTACT: state.contact.LOADING_GET_DETAIL_CONTACT,
    ERROR_GET_DETAIL_CONTACT: state.contact.ERROR_GET_DETAIL_CONTACT,
    LOADING_EDIT_CONTACT: state.contact.LOADING_EDIT_CONTACT,
    SUCCESS_EDIT_CONTACT: state.contact.SUCCESS_EDIT_CONTACT,
    ERROR_EDIT_CONTACT: state.contact.ERROR_EDIT_CONTACT,
  };
};

export default connect(mapStateToProps, {
  editContact,
  getDetailContact,
  resetGetDetail,
})(Detail);
