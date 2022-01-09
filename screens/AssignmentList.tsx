import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import AssignmentItem from '../components/AssignmentItem';
import AssignmentData from '../data/AssignmentsData';

const {width} = Dimensions.get('window');

const AssignmentList: React.FC<{}> = () => {
  const navigation = useNavigation();
  const onAssignmentPress = (index: number) => {
    console.log(AssignmentData?.[index]);
    // @ts-ignore
    navigation.navigate(AssignmentData?.[index]?.destination);
  };
  return (
    <SafeAreaView>
      <StatusBar showHideTransition={'fade'} backgroundColor={'transparent'} />
      <FlatList
        style={{width}}
        horizontal={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContainer}
        data={AssignmentData}
        renderItem={({item, index}) => (
          <AssignmentItem
            item={item}
            onPress={() => onAssignmentPress(index)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: width,
  },
});

export default AssignmentList;
