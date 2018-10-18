import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Badge } from 'react-native-elements';
import moment from 'moment';

import { success, white } from '../../colors';

export default class FlightCard extends Component {
  state = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  };

  componentDidMount() {
    const eventTime = this.props.wsstamp; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { name, rocket, missions, id } = this.props;
    const { days, hours, minutes, seconds } = this.state;
    return (
      <Card image={{ uri: rocket.imageURL }} containerStyle={{ borderRadius: 5 }}>
        <Text style={{ marginBottom: 10, fontSize: 24 }}>{name}</Text>
        <Text style={{ marginBottom: 10 }}>{!!missions.length && missions[0].description}</Text>
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
        <Button
          icon={{ name: 'rocket', type: 'font-awesome' }}
          backgroundColor="#03A9F4"
          buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title="VIEW DETAILS"
          onPress={() => this.props.navigation.navigate('Details', { id })}
        />
      </Card>
    );
  }
}
