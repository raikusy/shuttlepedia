import React, { Component } from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Badge, Text, Icon } from 'react-native-elements';
import moment from 'moment';

import { getPastLaunches, loadMore } from '../redux/past';
import StatusBadge from './components/StatusBadge';
import { primaryColor, yellow, white } from '../colors';
import LaunchDetails from './HomeScreen/LaunchDetails';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class PastScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Past Launches',
    drawerLabel: 'Past Launches',
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

  state = {
    page: 0,
  };

  componentDidMount() {
    this.props.getPastLaunches();
  }

  loadMore = () => {
    this.setState(
      state => ({
        page: state.page + 1,
      }),
      () => {
        this.props.loadMore(this.state.page + 1);
      }
    );
  };

  renderItem = ({ item }) => (
    <TouchableNativeFeedback
      onPress={() => this.props.navigation.navigate('Details', { id: item.id })}
    >
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View style={{ width: SCREEN_WIDTH / 2, alignSelf: 'flex-start', marginLeft: 10 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{moment(item.net).format('MMMM Do YYYY')}</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <StatusBadge status={item.status} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  onRefresh = () => {
    this.props.getPastLaunches();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={!!this.props.past.loading} onRefresh={this.onRefresh} />
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Badge
                containerStyle={{ backgroundColor: yellow, marginTop: SCREEN_HEIGHT / 2 - 100 }}
              >
                <Text>{this.props.past.loading ? 'Loading..' : 'No Past History'}</Text>
              </Badge>
            </View>
          }
          ListFooterComponent={
            this.props.past.loadingMore && (
              <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={primaryColor} />
              </View>
            )
          }
          data={this.props.past.launches}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={15}
          onEndReachedThreshold={0.5}
          // onEndReached={() => {
          //   this.loadMore();
          // }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ past }) => ({
  past,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPastLaunches,
      loadMore,
    },
    dispatch
  );

const PastScreenNavigator = createStackNavigator(
  {
    Past: connect(
      mapStateToProps,
      mapDispatchToProps
    )(PastScreen),
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

export default PastScreenNavigator;
