import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {FlipInEasyX} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {AppContext} from '../App';
import CheckoutItem from '../components/CheckoutItem';
import {productType} from '../data/mockdata/Products';

const ProductsCheckout = () => {
  const context = useContext(AppContext);
  const renderItem = ({item, index}: {item: productType; index: number}) => (
    <Animated.View entering={FlipInEasyX.delay(index * 75)}>
      <CheckoutItem item={item} />
    </Animated.View>
  );
  const navigation = useNavigation();

  const navigatieBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.screenConatiner}>
      <View style={styles.header}>
        <MaterialIcon
          onPress={navigatieBack}
          style={styles.icon}
          name="arrow-back-ios"
        />
        <Text style={styles.headerLabel}>Cart</Text>
        <View />
      </View>
      <FlatList
        data={context?.state?.products}
        // data={ProductArray}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}>
            <Text>Empty</Text>
          </View>
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={() =>
          (context?.state?.products.length ?? 0) > 0 ? (
            <View style={[styles.row]}>
              <Text style={styles.costLabelText}>Bag Total</Text>
              <Text style={styles.costLabel}>
                <FontAwesomeIcon name="rupee" style={styles.costLabel} />
                {(context.state?.price ?? 0).toFixed(2)}
              </Text>
            </View>
          ) : (
            <View />
          )
        }
      />

      <View style={[styles.header, styles.footer]}>
        <Pressable style={styles.continueButton}>
          <Text style={styles.cartLable}>Proceed To Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProductsCheckout;

const styles = StyleSheet.create({
  screenConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebeaef',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop: 20,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartLable: {
    color: 'white',
    fontWeight: '600',
    padding: 8,
    fontFamily: 'Roboto',
  },
  price: {
    color: 'black',
    fontWeight: '600',
    padding: 8,
    fontFamily: 'Roboto',
  },
  costLabel: {
    color: '#1d1c1c',
    fontWeight: '900',
    fontSize: 24,
    padding: 8,
    fontFamily: 'Roboto',
  },
  costLabelText: {
    color: '#1d1c1c',
    fontWeight: '900',
    fontSize: 18,
    padding: 8,
    fontFamily: 'Roboto',
  },
});
