import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AssignmentList from '../screens/AssignmentList';
import NavigationConstants from '../constants/NavigationConstants';
import TwitterTextField from '../screens/TwitterTextField';
import Calculator from '../screens/Calculator';
import MultipleButtonApi from '../screens/MultipleButtonApi';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
