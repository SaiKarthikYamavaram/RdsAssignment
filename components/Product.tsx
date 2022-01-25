import React, {useContext} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {AppContext} from '../App';
import {productType} from '../data/mockdata/Products';

const Product: React.FC<{item: productType}> = ({item}) => {
  const [quantity, setQuantity] = React.useState(0);
  const AnimatedText = React.useMemo(
    () => Animated.createAnimatedComponent(Text),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quantity],
  );
  const context = useContext(AppContext);

  const increment = () => {
    setQuantity(quantity + 1);
    context.dispatch({type: 'addProduct', payload: item});
  };
  const decrement = () => {
    setQuantity(quantity - 1);

    if (quantity === 1) {
      context.dispatch({type: 'deleteProduct', payload: item});
      return;
    }
    context.dispatch({type: 'reduceProductQuantity', payload: item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{uri: item.picture}} style={styles.image} />
        <View style={[styles.rowContainer]}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            <FontAwesomeIcon name="rupee" style={styles.price} />
            {item.price}
          </Text>
        </View>
        <View
          style={[styles.rowContainer, {justifyContent: 'center', margin: 4}]}>
          <View style={styles.button}>
            <Pressable
              onPressIn={decrement}
              disabled={quantity === 0}
              style={styles.btn}>
              <Icon
                name="minus"
                style={[styles.actionIcon, styles.negativeAction]}
              />
            </Pressable>
            <AnimatedText
              entering={FadeInDown}
              exiting={FadeOutUp}
              style={[styles.price, styles.quantity]}
              numberOfLines={1}>
              {quantity.toString().padStart(2, '0')}
            </AnimatedText>
            <Pressable onPressIn={increment} style={styles.btn}>
              <Icon
                name="plus"
                style={[styles.actionIcon, styles.positiveAction]}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 6,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 150,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: 'black',
  },
  price: {
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: 'black',
  },
  btn: {
    padding: 4,

    // borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positiveAction: {
    borderRadius: 50,
    backgroundColor: '#1d1c1c',
    borderColor: '#1d1c1c',
    borderWidth: 1,
    color: 'white',
  },
  negativeAction: {
    borderRadius: 50,
    backgroundColor: 'white',
    borderColor: '#1d1c1c',
    borderWidth: 1,
  },
  actionIcon: {
    fontSize: 16,
    padding: 2,
    color: 'black',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    // borderColor: '#a4a4a4',
    // borderWidth: 1,
    borderRadius: 16,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: 'black',
  },
});
