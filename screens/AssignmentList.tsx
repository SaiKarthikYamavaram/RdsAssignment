import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
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
        ItemSeparatorComponent={() => (
          <View
            style={{
              width,
              height: StyleSheet.hairlineWidth*25,
            }}
          />
        )}
        renderItem={({item, index}) => (
          <AssignmentItem
            item={item}
            onPress={() => onAssignmentPress(index)}
          />
        )}
      />
      <StatusBar showHideTransition={'fade'} backgroundColor={'#141d26'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: width,
    marginTop: 20,
  },
});

export default AssignmentList;
