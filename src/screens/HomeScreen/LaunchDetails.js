import React, { Component } from 'react';
import { ScrollView, Text, RefreshControl, View } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { getSingleLaunch } from '../../redux/singleLaunch';
import { white, success } from '../../colors';

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
    const { name, rocket, missions } = this.props.singleLaunch.data;
    const { days, hours, minutes, seconds } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={!!singleLaunch.loading} onRefresh={this.onRefresh} />
        }
        style={{ backgroundColor: white }}
      >
        <Card image={{ uri: rocket && rocket.imageURL }} containerStyle={{ borderRadius: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 24 }}>{name}</Text>
          <Text style={{ marginBottom: 10 }}>
            {missions && !!missions.length && missions[0].description}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Badge
              containerStyle={{
                backgroundColor: success,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text style={{ padding: 5, fontSize: 18, color: white }}>Launching in..</Text>
            </Badge>
          </View>
          <Text style={{ marginBottom: 10, fontSize: 26, textAlign: 'center' }}>
            <Text>{!!days && `${days}d : `}</Text>
            <Text>{`${hours}h : `}</Text>
            <Text>{`${minutes}m : `}</Text>
            <Text>{`${seconds}s`}</Text>
          </Text>
        </Card>
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
