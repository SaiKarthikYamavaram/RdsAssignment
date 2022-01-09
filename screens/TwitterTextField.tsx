/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ToastAndroid,
  StatusBar,
} from 'react-native';

const {width} = Dimensions.get('window');
const RIPPLE_CONFIG = {color: 'rgba(255,255,255,0.4)', borderless: false};
const NO_OF_CHAR = 10;
const WARNING_LIMIT = 4;

const TwitterTextField = () => {
  const [tweet, setTweet] = useState('');
  const [noOfCharRemaining, setNoOfCharRemaining] = useState(NO_OF_CHAR);
  const tweetInputRef = useRef(null);

  const handleTextChange = (text: string) => {
    setTweet(text);
  };

  const sendTweet = () =>
    ToastAndroid.showWithGravityAndOffset(
      'Tweeted succellfully!!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      300,
    );
  useEffect(() => {
    setNoOfCharRemaining(NO_OF_CHAR - tweet.length);
  }, [tweet]);

  const clearTweet = () => setTweet('');

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text
          style={[
            styles.btnLabel,
            {
              alignSelf: 'flex-start',
              marginBottom: 32,
              fontSize: 32,
              fontFamily: 'sans-serif',
              fontWeight: '700',
            },
          ]}>
          What's happening?
        </Text>
        <TextInput
          selectionColor={'skyblue'}
          ref={tweetInputRef}
          placeholder="Post something on your wall..."
          placeholderTextColor={'rgba(255,255,255,0.4)'}
          style={[
            styles.inputContainer,
            {
              borderColor:
                noOfCharRemaining > WARNING_LIMIT
                  ? 'rgba(255,255,255,0.7)'
                  : noOfCharRemaining > 0
                  ? 'yellow'
                  : 'red',
            },
          ]}
          onChangeText={handleTextChange}
          value={tweet}
          multiline={true}
        />
        <View style={styles.separator} />
        <Text style={styles.charCount}>
          {noOfCharRemaining} characters remaining
        </Text>
        <Pressable
          disabled={tweet.length === 0 || noOfCharRemaining < 0}
          onPress={() => {
            sendTweet();
            clearTweet();
          }}
          style={[
            styles.button,
            styles.fullBtn,
            styles.tweet,
            {opacity: tweet.length === 0 || noOfCharRemaining < 0 ? 0.4 : 1},
          ]}
          android_ripple={RIPPLE_CONFIG}>
          <Text style={styles.btnLabel}> Tweet</Text>
        </Pressable>
        <Pressable
          disabled={tweet.length === 0}
          onPress={clearTweet}
          android_ripple={RIPPLE_CONFIG}
          style={[
            styles.button,
            styles.fullBtn,
            {opacity: tweet.length === 0 ? 0.4 : 1},
          ]}>
          <Text style={styles.btnLabel}> Clear</Text>
        </Pressable>
      </View>
      <View style={{flex: 0.2}} />
      <StatusBar showHideTransition={'fade'} backgroundColor={'#141d26'} />
    </View>
  );
};

export default TwitterTextField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141d26',
  },
  inputContainer: {
    borderColor: '#1DA1F2',
    backgroundColor: '#141d26',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 12,
    height: 200,
    fontSize: 18,
    width: width * 0.9,
    justifyContent: 'flex-start',
    overflow: 'scroll',
    fontFamily: 'sans-serif',
    textAlignVertical: 'top',
    color: 'rgba(255,255,255,0.9)',
  },
  charCount: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
  separator: {
    flex: 0.02,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    borderRadius: 12,
    alignItems: 'center',
  },
  fullBtn: {
    width: 360,
    marginTop: 16,
  },
  btnLabel: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    letterSpacing: 1.25,
    color: 'white',
    fontWeight: 'bold',
  },
  tweet: {
    backgroundColor: '#1DA1F2',
  },
});
