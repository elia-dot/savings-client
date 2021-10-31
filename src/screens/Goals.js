import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearProgress } from 'react-native-elements';

import Goal from '../components/Goal';
import NoGoals from '../components/NoGoals';
import { useAuth } from '../context/authContext';
import { capitalize } from '../utils/capitalize';

export default function Goals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState(user.goals);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Other');
  const [formData, setFormData] = useState({ title: '', price: '', icon: '' });

  const categories = ['Other', 'Home', 'Entertainment', 'Vacation'];
  return (
    <View style={styles.body}>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>Let's create your saving goal!</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal title"
              placeholderTextColor="#eee"
              value={formData.title}
              onChangeText={(value) =>
                setFormData({ ...formData, title: value.toLowerCase() })
              }
            />
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal price"
              placeholderTextColor="#eee"
              value={formData.price}
              keyboardType="number-pad"
              onChangeText={(value) =>
                setFormData({ ...formData, price: value })
              }
            />
            {/* <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item color = "#9cc95a" style={styles.picker} label="Home" value="home" />
              <Picker.Item color = "#9cc95a" label="Entertainment" value="gamepad" />
              <Picker.Item color = "#9cc95a" label="Vication" value="plane" />
              <Picker.Item color = "#9cc95a" label="Other" value="question" />
            </Picker> */}
            <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
              <Text style={styles.btnText}>
                {loading ? 'Please wait...' : 'Create Goal'}
              </Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View>
        <View style={styles.totalSavings}>
          <Text style={styles.title}>
            {capitalize(user.name)}, you've already saved:
          </Text>
          <Text style={styles.savings}>
            {user.saving.toLocaleString()}
            <Text style={styles.currency}> $</Text>
          </Text>
        </View>
      </View>
      {goals.length > 0 ? (
        <>
          <FlatList
            data={goals}
            renderItem={({ item }) => <Goal goal={item} />}
            keyExtractor={(item) => item._id}
          />
          <FAB
            placement="right"
            color="#9cc95a"
            size="large"
            icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </>
      ) : (
        <NoGoals />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  modalBody: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: '500',
  },
  form: {
    marginTop: 100,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: '#9cc95a',
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: '#9cc95a',
    borderBottomWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 25,
    textAlign: 'left',
  },
  picker: {
    color: '#f4f9ec',
  },
  btn: {
    backgroundColor: '#9cc95a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 25,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
  },
  totalSavings: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 50,
  },
  savings: {
    fontSize: 60,
    fontWeight: '800',
    marginTop: 15,
  },
  currency: {
    fontSize: 25,
    color: '#9cc95a',
  },
});
