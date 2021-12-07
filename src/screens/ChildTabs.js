import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from 'react-native-material-menu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { logout } from '../redux/actions/auth';
import { getHour } from '../utils/getHour';
import ChildScreens from './ChildScreens';
import colors from '../globals/styles/colors';
import currency from '../globals/styles/currency';

const ChildTabs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.body}>
      <View>
        <Menu
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}
          style={{ position: 'absolute', left: 35, top: 110, zIndex: 999 }}
          anchor={
            <TouchableOpacity
              style={styles.cogBtn}
              onPress={() => setShowMenu(true)}
            >
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
            התנתק
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.top}>
        <Text style={styles.greet}>
          {getHour()}, {user.name.split(' ')[0]}
        </Text>
        <Text style={styles.topText}>
          עד עכשיו חסכת {(user.saving + user.profit).toLocaleString()}
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
    zIndex: -99,
  },
  cogBtn: {
    position: 'absolute',
    left: 35,
    top: 60,
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
  },
});
