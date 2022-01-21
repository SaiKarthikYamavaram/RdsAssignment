import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Layout,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import {gmailDetails} from '../data/mockdata/GmailDetails';

const MailItem: React.FC<{
  item: gmailDetails;
  index: number;
  onSlide: (index: number) => void;
}> = ({item, index, onSlide}) => {
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const borderWidth = useSharedValue(0);
  const thresholdL = -0.25 * width;
  const thresholdR = 0.25 * width;

  const AnimatedView = Animated.createAnimatedComponent(View);

  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        translateX.value = event.translationX;
        borderWidth.value = withTiming(1);
      },
      onEnd: _ => {
        if (translateX.value < thresholdL) {
          translateX.value = withTiming(
            -(width + 20),
            {duration: 50},
            isFinished => {
              if (isFinished) {
                runOnJS(onSlide)(index);
              }
            },
          );
        } else if (translateX.value > thresholdR) {
          translateX.value = withTiming(
            width + 20,
            {duration: 50},
            isFinished => {
              if (isFinished) {
                runOnJS(onSlide)(index);
              }
            },
          );
        } else {
          translateX.value = withTiming(0);
        }
        borderWidth.value = withTiming(0);
      },
    });

  const translateXStyle = useAnimatedStyle(
    () => ({
      borderWidth: borderWidth.value,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }),
    [],
  );
  return (
    <AnimatedView
      layout={Layout.delay(200)}
      style={[styles.container, styles.padding0, styles.bgRed]}>
      <PanGestureHandler
        activeOffsetY={[-1e20, 1e20]}
        activeOffsetX={0}
        onGestureEvent={panGestureHandler}>
        <AnimatedView
          style={[styles.container, styles.width100, translateXStyle]}>
          <Image source={{uri: item.pic}} style={styles.profileImage} />
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.description]}>{item.description}</Text>
          </View>
        </AnimatedView>
      </PanGestureHandler>
      <View style={[styles.iconContainer, styles.leftContainer]}>
        <Icon name="trash-o" style={styles.icon} />
      </View>
      <View style={[styles.iconContainer, styles.rightContainer]}>
        <Icon name="trash-o" style={styles.icon} />
      </View>
    </AnimatedView>
  );
};

export default MailItem;

const styles = StyleSheet.create({
  container: {
    width: '108%',
    paddingHorizontal: '8%',
    alignSelf: 'center',
    height: 60,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    borderRadius: 12,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  width100: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  padding0: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    marginRight: 16,
  },
  bgRed: {
    backgroundColor: '#f44336',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  description: {
    color: 'black',
    fontSize: 12,
    fontWeight: '400',
  },
  iconContainer: {
    position: 'absolute',
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  leftContainer: {
    left: 25,
  },
  rightContainer: {
    right: 25,
  },
});
