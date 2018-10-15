import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import moment from 'moment';

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
    const { name, rocket, missions } = this.props;
    const { days, hours, minutes, seconds } = this.state;
    return (
      <Card title={name} image={{ uri: rocket.imageURL }}>
        <Text style={{ marginBottom: 10 }}>{missions[0].description}</Text>
        <Text style={{ marginBottom: 10, textAlign: 'center' }}>Launching in...</Text>
        <Text style={{ marginBottom: 10, fontSize: 24, textAlign: 'center' }}>
          <Text>{!!days && `${days} days, `}</Text>
          <Text>{`${hours} hours, `}</Text>
          <Text>{`${minutes} minutes, `}</Text>
          <Text>{`${seconds} seconds`}</Text>
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title="VIEW DETAILS"
        />
      </Card>
    );
  }
}
