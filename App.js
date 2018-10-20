import React, { Component } from 'react';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

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
  componentDidMount = () => {
    this.checkPermission();
    this.messageListener = firebase.messaging().onMessage(message => {
      // Process your message as required
      console.log(message);
    });
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log(fcmToken);
      // this.updateFcmToken(fcmToken);
    });
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log('onNotificationDisplayed', notification);
      });
    this.notificationListener = firebase.notifications().onNotification(notification => {
      // Process your notification as required
      console.log('onNotification', notification);
    });
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const { action } = notificationOpen;
        console.log('onNotificationOpened - action', action);
        // Get information about the notification that was opened
        const { notification } = notificationOpen;
        console.log('onNotificationOpened - notification', notification);
        firebase.notifications().removeAllDeliveredNotifications();
        // this.props.navigation.navigate('Rewards');
      });
    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const { action } = notificationOpen;
          console.log('getInitialNotification - action', action);
          // Get information about the notification that was opened
          const { notification } = notificationOpen;
          console.log('getInitialNotification - notification', notification);
          firebase.notifications().removeAllDeliveredNotifications();
          // this.props.navigation.navigate('Rewards');
        }
      });
  };

  componentWillUnmount() {
    this.messageListener();
    this.onTokenRefreshListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  checkPermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken();
        } else {
          this.requestPermission();
        }
      });
  };

  requestPermission = () => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        // User has authorised
        this.getToken();
      })
      .catch(error => {
        // User has rejected permissions
        console.log('No Permission', error);
      });
  };

  getToken = () => {
    firebase
      .messaging()
      .getToken()
      .then(fcm => {
        if (fcm) {
          // user has a device token
          console.log('new fcm', fcm);
        } else {
          // user doesn't have a device token yet
          console.log('No Token');
        }
      });
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
