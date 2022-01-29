import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'; // use react-native-reanimated 2.3.0

function Card() {
  let sharedOpacity = useSharedValue<number>(1);

  const translate = () => {
    sharedOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {duration: 250}),
        withTiming(1, {duration: 250}),
      ),
    );
  };
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${interpolate(
          sharedOpacity.value,
          [0.3, 1],
          [0, 180],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));
  return (
    <Animated.View onTouchEnd={translate} style={[styles.card, cardStyle]} />
  );
}

export default function Test() {
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const [count, setCount] = useState<number>(0);
  let sharedTransform = useSharedValue<number>(100);
  let sharedOpacity = useSharedValue<number>(1);

  const animate = () => {
    setCount(count + 1);
    sharedTransform.value = withRepeat(
      withSequence(
        withTiming(0, {duration: 250}),
        withTiming(-100, {duration: 250}),
      ),
    );
    sharedOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {duration: 250}),
        withTiming(1, {duration: 250}),
      ),
    );
  };

  const animtedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: sharedTransform.value}],
    opacity: sharedOpacity.value,
    borderRadius: interpolate(sharedOpacity.value, [0.3, 1], [25, 0]),
    backgroundColor: interpolateColor(
      sharedOpacity.value,
      [0.3, 1],
      ['red', '#000'],
    ),
  }));

  return (
    <View style={styles.container}>
      <AnimatedText style={[styles.paragraph, animtedStyle]} />
      <TouchableOpacity onPress={animate}>
        <Text style={styles.btn}>Increment</Text>
      </TouchableOpacity>
      <Card />
      <Card />
      <Text />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderTopEndRadius: 12,
    backgroundColor: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 6,
    textAlign: 'center',
  },
  card: {
    width: 40,
    height: 80,
    backgroundColor: 'red',
  },
});
