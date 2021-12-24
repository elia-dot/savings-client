import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { isRTL } from 'expo-localization';

import colors from '../styles/colors';

const GoBackButton = () => {
  const navigation = useNavigation();
  return (
    <FontAwesome5
      name={isRTL ? 'chevron-left' : 'chevron-right'}
      color={colors.primary}
      size={25}
      onPress={() => navigation.goBack()}
      style={{ marginEnd: 20 }}
    />
  );
};

export default GoBackButton;
