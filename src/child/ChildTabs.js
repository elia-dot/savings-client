import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from 'react-native-material-menu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { logout } from '../redux/actions/auth';
import ChildScreens from './ChildScreens';
import colors from '../globals/styles/colors';
import currency from '../globals/styles/currency';
import i18n from 'i18n-js';

const ChildTabs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  if (user === null) return null;

  return (
    <View style={styles.body}>
      <View style={{ position: 'absolute', end: 20, top: 50 }}>
        <Menu
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}
          style={{ zIndex: 999 }}
          anchor={
            <TouchableOpacity style={styles.cogBtn} onPress={openMenu}>
              <FontAwesome5 name="cog" color={colors.secondary} size={25} />
            </TouchableOpacity>
          }
        >
          <MenuItem
            onPress={handleLogout}
            textStyle={{
              color: colors.primary,
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {i18n.t('menu.logout')}
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.top}>
        <Text style={styles.greet}>
          {i18n.t('misc.childGreetings', { name: user.name })}
        </Text>
        <Text style={styles.topText}>
          {i18n.t('misc.balance', {
            amount: (user.saving + user.profit).toFixed(1).toLocaleString(),
          })}           
          {currency.NIS}
        </Text>
      </View>
      <ChildScreens />
    </View>
  );
};

export default ChildTabs;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative',
  },
  top: {
    backgroundColor: colors.primary,
    height: 250,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 25,
    zIndex: -99,
  },
  cogBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.secondary,
    borderRadius: 25,
  },
  greet: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 35,
    marginBottom: 15,
  },
  topText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'center',
  },
});
