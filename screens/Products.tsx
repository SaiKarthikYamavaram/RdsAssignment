import {useNavigation} from '@react-navigation/native';
import React, {useContext, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
  FlipInEasyX,
  FlipOutEasyX,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {AppContext} from '../App';
import Product from '../components/Product';
import NavigationConstants from '../constants/NavigationConstants';
import ProductArray, {productType} from '../data/mockdata/Products';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const Products = () => {
  const context = useContext(AppContext);
  const renderItem = ({item, index}: {item: productType; index: number}) => (
    <Animated.View
      entering={FlipInEasyX.delay(index * 75)}
      exiting={FlipOutEasyX}>
      <Product item={item} />
    </Animated.View>
  );
  const navigation = useNavigation();
  const AnimatedText = useMemo(
    () => Animated.createAnimatedComponent(Text),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.state?.price],
  );
  const AnimatedTextHeader = useMemo(
    () => Animated.createAnimatedComponent(Text),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.state?.products.length],
  );

  const navigateBack = () => navigation.goBack();
  const navigateToCheckout = () => {
    if (context.state?.products.length === 0) return;
    navigation.navigate(NavigationConstants.CART);
  };
  return (
    <SafeAreaView style={styles.screenConatiner}>
      <View style={styles.header}>
        <MaterialIcon
          onPress={navigateBack}
          style={styles.icon}
          name="arrow-back-ios"
        />
        <Text style={styles.headerLabel}>Products</Text>

        <View style={styles.headerInnerContainer}>
          <AnimatedTextHeader
            entering={FadeInDown}
            exiting={FadeOutUp}
            style={styles.iconlabel}>
            {context.state?.products.length}
          </AnimatedTextHeader>
          <Icon
            style={styles.icon}
            onPress={navigateToCheckout}
            name="shopping-bag"
          />
        </View>
      </View>
      <AnimatedFlatlist
        data={ProductArray}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={[styles.header, styles.footer]}>
        <View>
          <AnimatedText style={styles.costLableAlt}>Sub Total</AnimatedText>
          <AnimatedText
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.costLabel}>
            <FontAwesomeIcon name="rupee" style={styles.costLabel} />
            {(context.state?.price ?? 0).toFixed(2)}
          </AnimatedText>
        </View>
        <Pressable style={styles.continueButton} onPress={navigateToCheckout}>
          <Text style={styles.cartLabel}>Proceed To Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  screenConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebeaef',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  headerLabel: {
    color: '#1d1c1c',
    fontWeight: '700',
    fontSize: 24,
    padding: 8,
  },
  footer: {
    padding: 12,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  iconlabel: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#1d1c1c',
    color: 'white',
    fontSize: 8,
    fontWeight: '900',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  icon: {
    fontSize: 20,
    color: '#1d1c1c',
    fontWeight: '900',
  },
  headerInnerContainer: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  continueButton: {
    backgroundColor: '#1d1c1c',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  cartLabel: {
    color: 'white',
    fontWeight: '700',
    padding: 8,
    fontFamily: 'Roboto',
  },
  costLabel: {
    color: '#1d1c1c',
    fontWeight: '900',
    fontSize: 32,
    fontFamily: 'Roboto',
  },
  costLableAlt: {
    color: 'grey',
    fontWeight: '700',
  },
});
