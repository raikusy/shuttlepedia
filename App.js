import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import HomeScreenNavigator from './src/screens/HomeScreen';

const AppNavigator = createDrawerNavigator({
  Home: HomeScreenNavigator,
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
