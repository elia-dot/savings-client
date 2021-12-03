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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { logout } from '../redux/actions/auth';
import colors from '../globals/styles/colors';
import AddChild from '../components/AddChild';

const ParentTab = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [children, setChildren] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    user && setChildren(user.children);
  }, [user]);
  console.log(children);
  return (
    <View style={styles.body}>
      {<AddChild showModal={showModal} setShowModal={setShowModal} />}
      <FlatList
        data={children}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>{item.name}</Text>
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
      <TouchableOpacity onPress={handleLogout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParentTab;
const styles = StyleSheet.create({
  body: {
    flex: 1,
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
});
