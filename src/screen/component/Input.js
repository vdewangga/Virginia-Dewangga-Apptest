/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Input({
  changeText,
  defaultValue,
  placeholder,
  keyboardType = 'numeric',
  style = {},
  multiline = false,
  numberOfLines = 1,
  editable = true,
  isError = false,
  errorMessage = "Text Cannot Be Empty!"
}) {
  const [isFocus, setFocus] = useState(false);
  return (
    <>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocus ? '#37ABFF' : editable ? '#DCDFE3' : '#F5F6F7',
            backgroundColor:
              isFocus || (defaultValue?.length > 0 && editable)
                ? '#fff'
                : '#F5F6F7',
            alignItems: 'center',
            justifyContent: 'flex-start',
          },
          !isError && {marginBottom: 8},
          style,
        ]}>
        <TextInput
          style={[
            {
              fontSize: 16,
              width: '100%',
              height: 100,
              textAlignVertical: multiline ? 'top' : 'center',
              color: '#242D35',
            },
          ]}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={value => {
            changeText?.(value);
          }}
          defaultValue={defaultValue}
          editable={editable}
        />
      </View>
      {isError && (
        <Text style={{marginBottom: 8, fontSize: 12, color: '#EE2B4E'}}>
          {errorMessage}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: hp('7%'),
    marginTop: 8,
    flexDirection: 'row',
  },
});

export default Input;
