import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { getLaunches } from '../redux/launch';
import FlightCard from './components/FlightCard';
import { primaryColor } from '../colors';

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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={!!this.props.launch.loading} onRefresh={this.onRefresh} />
        }
      >
        {!!this.props.launch.launches.length &&
          this.props.launch.launches.map(item => <FlightCard key={item.id} {...item} />)}
      </ScrollView>
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
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#03A9F4',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default HomeScreenNavigator;
