import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { getLaunches } from '../redux/launch';
import FlightCard from './components/FlightCard';

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    drawerLabel: 'Home',
    headerLeft: (
      <Icon
        color="#03A9F4"
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

  render() {
    return (
      <ScrollView>
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
