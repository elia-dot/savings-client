import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FAB } from 'react-native-elements';
import { Menu, MenuItem } from 'react-native-material-menu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { logout } from '../redux/actions/auth';
import colors from '../globals/styles/colors';
import AddChild from '../components/AddChild';

const ParentTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [children, setChildren] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    user && setChildren(user.children);
  }, [user]);

  return (
    <View style={styles.body}>
      <View style={{ position: 'absolute', left: 5, top: 5 }}>
        <Menu
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}
          style={{ position: 'absolute', left: -80, top: 120 }}
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
      <AddChild showModal={showModal} setShowModal={setShowModal} />
      {children.length === 0 && (
        <Text>לא נמצאו חשבונות ילד המקושרות לחשבונך</Text>
      )}
      <FlatList
        data={children}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.btn}>
            <Text
              style={styles.btnText}
              onPress={() =>
                navigation.navigate('ParentScreens', {
                  userId: item._id,
                })
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
      <FAB
        placement="left"
        color={colors.primary}
        size="large"
        icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
        onPress={() => {
          setShowModal(true);
        }}
      />
    </View>
  );
};

export default ParentTab;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingTop: 200,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: 200,
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
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
});
