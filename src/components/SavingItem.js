import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import colors from '../globals/styles/colors';

const SavingItem = ({ item }) => {
  const created = moment(item.createdAt).format('DD/MM/YYYY');
  return (
    <View style={styles.item}>
      <View style={styles.amount}>
        <View
          style={[
            styles.badge,
            item.amount < 0 ? styles.negativeBadge : styles.positiveBadge,
          ]}
        ></View>
        <Text
          style={[
            styles.textAmount,
            item.amount < 0 ? styles.negative : styles.positive,
          ]}
        >
          {item.amount}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.textDesc}>
          {item.description ? item.description : 'הפקדה'}
        </Text>
      </View>
      <View style={styles.created}>
        <Text style={styles.createdText}>{created}</Text>
      </View>
    </View>
  );
};

export default SavingItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    display: 'flex',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    overflow: 'hidden',
  },
  textAmount: {
    fontSize: 20,
    textAlign: 'center',
  },
  amount: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    width: '20%',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    height: '300%',
    width: 8,
    top: -4,
    left: -10,
  },
  positive: {
    color: '#00cc00',
  },
  negative: {
    color: '#ff1a1a',
  },
  positiveBadge: {
    backgroundColor: '#00cc00',
  },
  negativeBadge: {
    backgroundColor: '#ff1a1a',
  },
  textDesc: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRightColor: colors.primary,
    borderLeftColor: colors.primary,
    borderEndWidth: 0.3,
    borderStartWidth: 0.3,
    flex: 2,
  },
  created: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    width: '30%',
  },
  createdText: {
    fontSize: 15,
    color: '#888',
  },
});
