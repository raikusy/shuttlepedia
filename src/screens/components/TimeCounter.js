import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Badge } from 'react-native-elements';

import { success, white } from '../../colors';

export default class TimeCounter extends Component {
  render() {
    const { days, hours, minutes, seconds } = this.props;
    return (
      <View>
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
            <Text style={{ padding: 5, fontSize: 18, color: white }}>Launching in..</Text>
          </Badge>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontSize: 46, textAlign: 'center' }}>{days}:</Text>
            <Text style={{ textAlign: 'center' }}>Days</Text>
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontSize: 46, textAlign: 'center' }}>{hours}:</Text>
            <Text style={{ textAlign: 'center' }}>Hours</Text>
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontSize: 46, textAlign: 'center' }}>{minutes}:</Text>
            <Text style={{ textAlign: 'center' }}>Minutes</Text>
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontSize: 46, textAlign: 'center' }}>{seconds}</Text>
            <Text style={{ textAlign: 'center' }}>Seconds</Text>
          </View>
        </View>
      </View>
    );
  }
}
