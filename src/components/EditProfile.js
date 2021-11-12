import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Overlay, CheckBox, LinearProgress } from 'react-native-elements';
import { useMutation } from 'react-query';

import { updateCurrency } from '../api';
import { useAuth } from '../context/authContext';

const EditProfile = ({ showEdit, setShowEdit, type }) => {
  const { currency, setCurrency, user } = useAuth();
  const [currencyChecked, setCurrencyChecked] = useState(currency);

  const { mutateAsync: mutateCurrency, isLoading } =
    useMutation(updateCurrency);

  const changeCurrency = () => {
    mutateCurrency({ id: user._id, currencyChecked });
    setCurrency(currencyChecked);
    setShowEdit(false);
  };

  const checkUsd = () => {
    setCurrencyChecked('$');
  };

  const checkNis = () => {
    setCurrencyChecked('\u20AA');
  };

  const checkEuro = () => {
    setCurrencyChecked('\u20AC');
  };

  return (
    <View>
      <Overlay
        isVisible={showEdit}
        onBackdropPress={() => setIsError(false)}
        fullScreen
      >
        {type === 'currency' && (
          <View style={styles.body}>
            <Text style={styles.title}>Choose Currency:</Text>
            <CheckBox
              title="$ USD"
              checked={currencyChecked === '$'}
              checkedColor="#9cc95a"
              onPress={checkUsd}
              containerStyle={styles.checkboxContainer}
            />
            <CheckBox
              title={`${'\u20AA'} NIS`}
              checked={currencyChecked === '\u20AA'}
              checkedColor="#9cc95a"
              onPress={checkNis}
              containerStyle={styles.checkboxContainer}
            />
            <CheckBox
              title={`${'\u20AC'} euro`}
              checked={currencyChecked === '\u20AC'}
              checkedColor="#9cc95a"
              onPress={checkEuro}
              containerStyle={styles.checkboxContainer}
            />

            <TouchableOpacity style={styles.submit}>
              <Text style={styles.btnText} onPress={changeCurrency}>
                Save
              </Text>
              {isLoading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </Overlay>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 40,
  },
  checkboxContainer: {
    width: '85%',
  },
  submit: {
    backgroundColor: '#9cc95a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '50%',
    marginTop: 40,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
});
