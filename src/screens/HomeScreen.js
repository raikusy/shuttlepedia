import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Card, Button, Icon } from 'react-native-elements';

import { getLaunches } from '../redux/launch';

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
          this.props.launch.launches.map(item => (
            <Card key={item.id} title={item.name} image={{ uri: item.rocket.imageURL }}>
              <Text style={{ marginBottom: 10 }}>{item.missions[0].description}</Text>
              <Button
                icon={{ name: 'code' }}
                backgroundColor="#03A9F4"
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title="VIEW DETAILS"
              />
            </Card>
          ))}
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
