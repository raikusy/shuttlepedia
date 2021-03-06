import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { getRockets } from '../redux/rocket';
import RocketCard from './components/RocketCard';
import { primaryColor, white } from '../colors';
import RocketDetails from './RocketScreen/RocketDetails';

export class RocketScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Shuttle Gallery',
    drawerLabel: 'Shuttle Gallery',
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
    this.props.getRockets();
  }

  onRefresh = () => {
    this.props.getRockets();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={!!this.props.rocket.loading} onRefresh={this.onRefresh} />
          }
          renderItem={({ item }) => (
            <RocketCard navigation={this.props.navigation} key={item.id} {...item} />
          )}
          data={this.props.rocket.rockets}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ rocket }) => ({
  rocket,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRockets,
    },
    dispatch
  );

const RocketScreenNavigator = createStackNavigator(
  {
    Rocket: connect(
      mapStateToProps,
      mapDispatchToProps
    )(RocketScreen),
    Details: RocketDetails,
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

export default RocketScreenNavigator;
