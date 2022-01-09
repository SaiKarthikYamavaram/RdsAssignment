import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {assignmentData} from '../data/AssignmentsData';

const AssignmentItem: React.FC<{
  item: assignmentData;
  onPress: () => void;
}> = ({item, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: 'rgba(0,0,0,0.25)', borderless: false}}
      style={styles.container}>
      <Text style={styles.title}> {item.title} </Text>
      <Text style={[styles.title, styles.goindicatior]}> {'>'}</Text>
    </Pressable>
  );
};

export default AssignmentItem;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  goindicatior: {
    fontWeight: '700',
  },
});
