import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../App';
import {productType} from '../data/mockdata/Products';

const {width} = Dimensions.get('window');

const CheckoutItem: React.FC<{
  item: productType;
  refresh: boolean;
  setRefresh: (k: boolean) => void;
}> = ({item, refresh, setRefresh}) => {
  const [quantity, setQuantity] = React.useState(item.quantity ?? 0);
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
  const deleteItem = () => {
    context.dispatch({type: 'deleteProduct', payload: item});
    setRefresh(!refresh);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };
  const decrement = () => {
    if (quantity < 1) {
      return;
    }
    setQuantity(quantity - 1);

    context.dispatch({type: 'reduceProductQuantity', payload: item});
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.actionContainer}>
        <Pressable onPress={deleteItem}>
          <Ionicons name="close" style={styles.delete} />
        </Pressable>
        <View />
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
    </SafeAreaView>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 4,
    height: 64,
    width: width * 0.9,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: 64,
    aspectRatio: 1,
    borderRadius: 4,
  },
  rowContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    height: 64,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: 'black',
  },
  price: {
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: 'black',
  },
  btn: {
    padding: 6,

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
  delete: {
    top: 4,
    right: 4,
    color: 'black',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  actionContainer: {
    justifyContent: 'space-around',
    height: 64,
    marginRight: 8,
  },
});
