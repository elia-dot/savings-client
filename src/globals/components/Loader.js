import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useSelector } from 'react-redux';

import colors from '../styles/colors';

const Loader = ({title}) => {
  const { loading } = useSelector((state) => state.globals);

  return (
    <Overlay
      isVisible={loading}
      overlayStyle={{
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
      backdropStyle={{ backgroundColor: 'none' }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ color: colors.primary, marginTop: 5 }}>{title}</Text>
    </Overlay>
  );
};

export default Loader;
