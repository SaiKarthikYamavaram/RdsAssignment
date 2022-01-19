import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {gmailDetails} from '../data/mockdata/GmailDetails';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          translateX.value = withTiming(-width, {}, isFinished => {
            if (isFinished) {
              runOnJS(onSlide)(index);
            }
          });
        } else if (translateX.value > thresholdR) {
          translateX.value = withTiming(width, {}, isFinished => {
            if (isFinished) {
              runOnJS(onSlide)(index);
            }
          });
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
    <View style={[styles.container, styles.padding0, styles.bgRed]}>
      <PanGestureHandler
        activeOffsetY={[-1e20, 1e20]}
        activeOffsetX={0}
        onGestureEvent={panGestureHandler}>
        <AnimatedView
          style={[styles.container, styles.width100, translateXStyle]}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.description]}>{item.description}</Text>
        </AnimatedView>
      </PanGestureHandler>
      <View style={[styles.iconContainer, styles.leftContainer]}>
        <Icon name="trash-o" style={styles.icon} />
      </View>
      <View style={[styles.iconContainer, styles.rightContainer]}>
        <Icon name="trash-o" style={styles.icon} />
      </View>
    </View>
  );
};

export default MailItem;

const styles = StyleSheet.create({
  container: {
    width: '108%',
    paddingHorizontal: '8%',
    alignSelf: 'center',
    height: 50,
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
  width100: {width: '100%'},
  padding0: {
    paddingHorizontal: 0,
    paddingVertical: 0,
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
