import React, { Component } from 'react';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './src/store';
import Sidebar from './src/screens/components/Sidebar';
import HomeScreenNavigator from './src/screens/HomeScreen';
import RocketScreenNavigator from './src/screens/RocketScreen';
import ArticleScreenNavigator from './src/screens/ArticleScreen';
import PastScreenNavigator from './src/screens/PastScreen';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreenNavigator,
      navigationOptions: () => ({
        title: 'Upcoming Launches',
        drawerIcon: <Icon name="home" type="octicon" />,
      }),
    },
    Rocket: {
      screen: RocketScreenNavigator,
      navigationOptions: () => ({
        title: 'Shuttle Gallery',
        drawerIcon: <Icon name="rocket" type="simple-line-icon" />,
      }),
    },
    Articles: {
      screen: ArticleScreenNavigator,
      navigationOptions: () => ({
        title: 'Space Articles',
        drawerIcon: <Icon name="book" type="octicon" />,
      }),
    },
    Past: {
      screen: PastScreenNavigator,
      navigationOptions: () => ({
        title: 'Past Launches',
        drawerIcon: <Icon name="flame" type="octicon" />,
      }),
    },
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
