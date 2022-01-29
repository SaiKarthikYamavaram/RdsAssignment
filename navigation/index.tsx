import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import AssignmentList from '../screens/AssignmentList';
import NavigationConstants from '../constants/NavigationConstants';
import TwitterTextField from '../screens/TwitterTextField';
import Calculator from '../screens/Calculator';
import MultipleButtonApi from '../screens/MultipleButtonApi';
import FlatlistScreen from '../screens/FlatlistScreen';
import Products from '../screens/Products';
import ProductsCheckout from '../screens/ProductsCheckout';
import Test from '../screens/Test';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={NavigationConstants.HOME}
          component={AssignmentList}
        />
        <Stack.Screen
          name={NavigationConstants.TWITTER_TEXT_FIELD}
          component={TwitterTextField}
        />
        <Stack.Screen
          name={NavigationConstants.CACULATOR}
          component={Calculator}
        />
        <Stack.Screen
          name={NavigationConstants.MULTIPLE_CALLS}
          component={MultipleButtonApi}
        />
        <Stack.Group>
          <Stack.Screen
            name={NavigationConstants.FLATLIST}
            component={gestureHandlerRootHOC(FlatlistScreen)}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={NavigationConstants.PRODUCTS}
            component={Products}
          />
          <Stack.Screen
            name={NavigationConstants.CART}
            component={ProductsCheckout}
          />
        </Stack.Group>
        <Stack.Screen name={NavigationConstants.TEST} component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
