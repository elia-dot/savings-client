import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useSelector } from 'react-redux';

import colors from '../styles/colors';

const Loader = () => {
  const { loading } = useSelector((state) => state.globals);
  return (
    <Overlay isVisible={loading} overlayStyle={{ backgroundColor: 'none' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Overlay>
  );
};

export default Loader;
