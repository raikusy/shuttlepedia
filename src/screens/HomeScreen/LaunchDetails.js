import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  RefreshControl,
  View,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Badge, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { getSingleLaunch } from '../../redux/singleLaunch';
import { white, success, black, primaryColor, danger } from '../../colors';
import TimeCounter from '../components/TimeCounter';
import StatusBadge from '../components/StatusBadge';

class LaunchDetails extends Component {
  static navigationOptions = () => ({
    title: 'Launch Details',
  });

  state = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  };

  componentDidMount() {
    const { getParam } = this.props.navigation;
    const id = getParam('id');
    this.props.getSingleLaunch(id);
    const eventTime = this.props.singleLaunch.data.wsstamp; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
    const currentTime = moment().unix(); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
    const diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime * 1000, 'milliseconds');
    const interval = 1000;

    this.interval = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds');
      this.setState({
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, interval);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.singleLaunch.data.wsstamp !== nextProps.singleLaunch.data.wsstamp) {
      clearInterval(this.interval);
      const eventTime = nextProps.singleLaunch.data.wsstamp; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
      const currentTime = moment().unix(); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
      const diffTime = eventTime - currentTime;
      let duration = moment.duration(diffTime * 1000, 'milliseconds');
      const interval = 1000;

      this.interval = setInterval(() => {
        duration = moment.duration(duration - interval, 'milliseconds');
        this.setState({
          days: duration.days(),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      }, interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onRefresh = () => {
    const { getParam } = this.props.navigation;
    const id = getParam('id');
    this.props.getSingleLaunch(id);
  };

  render() {
    const { singleLaunch } = this.props;
    const { name, rocket, missions, vidURLs, status } = this.props.singleLaunch.data;

    if (singleLaunch.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
          <Badge containerStyle={{ backgroundColor: success, marginTop: 20 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: white }}>Loading</Text>
          </Badge>
        </View>
      );
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={!!singleLaunch.loading} onRefresh={this.onRefresh} />
        }
        style={{ backgroundColor: white }}
      >
        {rocket &&
          rocket.imageURL && <Image style={{ height: 200 }} source={{ uri: rocket.imageURL }} />}
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10, fontSize: 24, textAlign: 'center' }}>{name}</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StatusBadge status={status} />
          </View>
          {status === 1 && <TimeCounter {...this.state} />}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              flexWrap: 'wrap',
            }}
          >
            {vidURLs &&
              vidURLs.map(item => (
                <Button
                  key={item}
                  icon={{ name: 'live-tv', type: 'material', color: danger }}
                  title={status === 1 ? 'LIVE' : 'VIDEO'}
                  buttonStyle={{
                    backgroundColor: white,
                    borderColor: danger,
                    borderWidth: 0,
                    borderRadius: 5,
                    padding: 5,
                  }}
                  containerViewStyle={{
                    marginLeft: 0,
                  }}
                  textStyle={{ color: danger }}
                  onPress={() => {
                    Linking.openURL(item);
                  }}
                />
              ))}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
          >
            <Badge
              containerStyle={{
                backgroundColor: success,
                borderRadius: 5,
              }}
            >
              <Text style={{ padding: 5, fontSize: 18, color: white }}>Mission</Text>
            </Badge>
          </View>
          {missions &&
            missions.map(item => (
              <View key={item.id}>
                <Text style={{ marginBottom: 10, fontSize: 18, color: black, textAlign: 'center' }}>
                  {item.name}
                </Text>
                <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              </View>
            ))}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
          >
            <Badge
              containerStyle={{
                backgroundColor: success,
                borderRadius: 5,
              }}
            >
              <Text style={{ padding: 5, fontSize: 18, color: white }}>Rocket</Text>
            </Badge>
          </View>
          <View>
            <Text style={{ marginBottom: 10, fontSize: 18, color: black, textAlign: 'center' }}>
              {rocket && rocket.name}
            </Text>
            <Text>Configuration: {rocket && rocket.configuration}</Text>
            <Text>Family: {rocket && rocket.familyname}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                icon={{ name: 'wikipedia-w', type: 'font-awesome', color: primaryColor }}
                title="WIKI"
                buttonStyle={{
                  backgroundColor: white,
                  borderColor: primaryColor,
                  borderWidth: 0,
                  borderRadius: 5,
                  padding: 5,
                }}
                containerViewStyle={{
                  marginLeft: 0,
                }}
                textStyle={{ color: primaryColor }}
                onPress={() => {
                  Linking.openURL(rocket.wikiURL);
                }}
              />
              <Button
                icon={{ name: 'info', type: 'font-awesome', color: primaryColor }}
                title="INFO"
                buttonStyle={{
                  backgroundColor: white,
                  borderColor: primaryColor,
                  borderWidth: 0,
                  borderRadius: 5,
                  padding: 5,
                }}
                containerViewStyle={{
                  marginLeft: 0,
                }}
                textStyle={{ color: primaryColor }}
                onPress={() => {
                  Linking.openURL(rocket.infoURL);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ singleLaunch }) => ({
  singleLaunch,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSingleLaunch,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchDetails);
