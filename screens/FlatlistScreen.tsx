import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MailItem from '../components/ContactItem';
import GmailDetails, {gmailDetails} from '../data/mockdata/GmailDetails';

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
      setDeletedStack(k);
    }
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
        style={[styles.bottomContainer]}>
        <Icon name="md-arrow-undo-sharp" style={styles.icon} />
        <Animated.View style={styles.labelContainer}>
          <Animated.Text
            entering={FadeInDown}
            exiting={FadeOutUp}
            style={[styles.label]}>
            {deletedStack.length}
          </Animated.Text>
        </Animated.View>
      </AnimatedPressable>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'black',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  icon: {
    fontSize: 16,
    color: 'white',
  },
  label: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  labelContainer: {
    position: 'absolute',
    top: -6,
    left: 0,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FlatlistScreen;
