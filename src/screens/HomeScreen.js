import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { getLaunches } from '../redux/launch';
import FlightCard from './components/FlightCard';
import LaunchDetails from './HomeScreen/LaunchDetails';
import { primaryColor, white } from '../colors';

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Upcoming Launches',
    drawerIcon: <Icon name="rocket" type="simple-line-icon" />,
    headerLeft: (
      <Icon
        color={primaryColor}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => navigation.openDrawer()}
        name="menu"
        underlayColor="transparent"
      />
    ),
  });

  componentDidMount() {
    this.props.getLaunches();
  }

  onRefresh = () => {
    this.props.getLaunches();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={!!this.props.launch.loading} onRefresh={this.onRefresh} />
          }
          renderItem={({ item }) => (
            <FlightCard navigation={this.props.navigation} key={item.id} {...item} />
          )}
          data={this.props.launch.launches}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ launch }) => ({
  launch,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLaunches,
    },
    dispatch
  );

const HomeScreenNavigator = createStackNavigator(
  {
    Home: connect(
      mapStateToProps,
      mapDispatchToProps
    )(HomeScreen),
    Details: LaunchDetails,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: white,
      },
      headerTintColor: primaryColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default HomeScreenNavigator;
