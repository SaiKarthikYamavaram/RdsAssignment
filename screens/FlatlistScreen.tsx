import React, {useState} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MailItem from '../components/ContactItem';
import GmailDetails, {gmailDetails} from '../data/mockdata/GmailDetails';

const {width} = Dimensions.get('window');
const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface deletedProps {
  item: gmailDetails;
  index: number;
}
const FlatlistScreen: React.FC<{}> = () => {
  const [data, setData] = useState(GmailDetails);
  const [deletedStack, setDeletedStack] = useState<deletedProps[]>([]);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const removeElement = (index: number) => {
    const newDeletedStack = [
      {
        item: data[index],
        index: index,
      },
      ...deletedStack,
    ];
    setDeletedStack(newDeletedStack);
    const newData = data.filter((item, ind) => index !== ind);
    setData(newData);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const undoDelete = () => {
    if (deletedStack.length === 0) {
      return;
    }

    const k = [...deletedStack];
    const recentlyDeleted = k.shift();
    const z = [
      ...data.slice(0, recentlyDeleted?.index),
      recentlyDeleted?.item,
      ...data.slice(recentlyDeleted?.index),
    ];
    LayoutAnimation.configureNext(layoutAnimConfig);
    if (z.length > 0) {
      setData(z);
    }
    setDeletedStack(k);
  };

  const renderItem = ({item, index}: {item: gmailDetails; index: number}) => (
    <MailItem item={item} index={index} onSlide={removeElement} />
  );

  return (
    <SafeAreaProvider>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        renderToHardwareTextureAndroid
      />
      <AnimatedPressable
        onPress={undoDelete}
        disabled={deletedStack.length === 0}
        style={[
          styles.bottomContainer,
          {opacity: deletedStack.length === 0 ? 0.6 : 1},
        ]}>
        <Icon name="md-arrow-undo-sharp" style={styles.icon} />
        <Text style={styles.label}>Undo {deletedStack.length} </Text>
      </AnimatedPressable>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: width,
    height: 60,
    backgroundColor: 'black',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  label: {
    color: 'white',
  },
});
export default FlatlistScreen;
