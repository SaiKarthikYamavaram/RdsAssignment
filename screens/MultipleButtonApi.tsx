import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
// https://codesandbox.io/s/laughing-hopper-c71wc?file=/src/App.js
const {width} = Dimensions.get('window');
const busyMessage = 'Call already in Progress';
const MultipleButtonApi = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, setData] = useState<Object | null>(null);
  const [error, setError] = useState(null);

  const handleFakeAPICall = () => {
    return new Promise<Object>((resolve, reject) => {
      const duration = Math.floor(Math.random() * 4 + 3);

      setTimeout(() => {
        resolve({duration: duration});
      }, duration * 1000);
    });
  };

  const apiCall = () => {
    if (isLoading) {
      ToastAndroid.show(busyMessage, ToastAndroid.SHORT);
      console.log(busyMessage);
      return;
    }
    setIsLoading(true);
    handleFakeAPICall()
      .then(res => {
        setData(res);
        setError(null);
      })
      .catch(er => {
        setError(er);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={'white'} size={'large'} />
        ) : data ? (
          <Text style={[styles.btnLabel, styles.response]}>
            {data.duration}
          </Text>
        ) : (
          <Text style={[styles.btnLabel, styles.response]}>{error}</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={apiCall} style={[styles.button]}>
          <Text style={styles.btnLabel}> Click</Text>
        </Pressable>
        <Pressable onPress={apiCall} style={[styles.button]}>
          <Text style={styles.btnLabel}> Click</Text>
        </Pressable>
        <Pressable onPress={apiCall} style={[styles.button]}>
          <Text style={styles.btnLabel}> Click</Text>
        </Pressable>
        <StatusBar showHideTransition={'fade'} backgroundColor={'#141d26'} />
      </View>
    </View>
  );
};

export default MultipleButtonApi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141d26',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1DA1F2',
    alignItems: 'center',
  },
  btnLabel: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    letterSpacing: 1.25,
    color: 'white',
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    width,
    justifyContent: 'space-evenly',
  },
  resultContainer: {
    marginBottom: 32,
  },
  response: {
    fontSize: 32,
  },
});
