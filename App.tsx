/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CustomDrawer from './navigation/CustomDrawer';

import {Provider} from 'react-redux';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Home'}>
          <Stack.Screen name="Home" component={CustomDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
