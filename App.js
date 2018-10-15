import React, { Component } from 'react';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import Sidebar from './src/screens/components/Sidebar';
import HomeScreenNavigator from './src/screens/HomeScreen';
import RocketScreenNavigator from './src/screens/RocketScreen';
import ArticleScreenNavigator from './src/screens/ArticleScreen';
import PastScreenNavigator from './src/screens/PastScreen';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreenNavigator,
    Rocket: RocketScreenNavigator,
    Article: ArticleScreenNavigator,
    Past: PastScreenNavigator,
  },
  {
    contentComponent: props => <Sidebar {...props} />, //eslint-disable-line
  }
);

const AppNavigator = createSwitchNavigator({
  Home: DrawerNavigator,
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
