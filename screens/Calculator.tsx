/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

interface calculatorProps {
  navigation: NavigationProp<ParamListBase>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calculator: React.FC<calculatorProps> = ({navigation}) => {
  const [result, setResult] = useState<number>(0);
  const [isZero, setIsZero] = useState<boolean>(true);
  const {width} = useWindowDimensions();

  useEffect(() => {
    setIsZero(result === 0);
  }, [result]);

  const increment = () => setResult(result + 1);
  const decrement = () => setResult(Math.max(result - 1, 0));
  const double = () => setResult(result * 2);
  const half = () => setResult(Math.floor(result / 2));
  const mod2 = () => setResult(result % 2);
  const fiftyX = () => setResult(result * 50);
  const hundreadX = () => setResult(result * 100);
  const reset = () => setResult(0);

  return (
    <View style={[styles.container, {width}]}>
      <Text style={styles.result}>{result}</Text>
      <View style={{flex: 0.15}} />
      <View style={styles.btnContainer}>
        <Pressable
          disabled={isZero}
          onPress={decrement}
          style={[styles.button, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}>Decrement</Text>
        </Pressable>
        <Pressable
          onPress={mod2}
          disabled={isZero}
          style={[styles.button, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}> % 2</Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={isZero}
          onPress={double}
          style={[styles.button, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}> Double</Text>
        </Pressable>
        <Pressable
          disabled={isZero}
          onPress={half}
          style={[styles.button, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}>Half</Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={isZero}
          onPress={fiftyX}
          style={[styles.button, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}> X50</Text>
        </Pressable>
        <Pressable
          disabled={isZero}
          onPress={hundreadX}
          style={[styles.button, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}>X100</Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={increment} style={[styles.button, styles.fullBtn]}>
          <Text style={styles.btnLabel}> Increment</Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          onPress={reset}
          disabled={isZero}
          style={[styles.button, styles.fullBtn, {opacity: isZero ? 0.4 : 1}]}>
          <Text style={styles.btnLabel}> Reset</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#79018C',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#012e67',
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
  },
  fullBtn: {
    width: '95%',
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  result: {
    fontSize: 128,
    color: '#fff',
  },
  resultLable: {
    fontSize: 48,
    marginLeft: '-25%',
  },
});
