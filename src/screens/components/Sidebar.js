import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import logo from '../../images/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  logoutButton: {
    justifyContent: 'center',
  },
});

class Sidebar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} forceInset={{ top: 'always', horizontal: 'never' }}>
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              margin: 20,
            }}
            square
            source={logo}
          />
          <Text style={styles.title}>ShuttlePedia</Text>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}

export default Sidebar;
