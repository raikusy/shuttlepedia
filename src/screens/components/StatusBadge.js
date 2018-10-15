import React, { Component } from 'react';
import { Badge, Text } from 'react-native-elements';

import { success, danger, yellow, white, black } from '../../colors';

export default class DiscountBadge extends Component {
  render() {
    const { status } = this.props;
    if (status === 1) {
      return (
        <Badge containerStyle={{ backgroundColor: success }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: white }}>Ready</Text>
        </Badge>
      );
    }
    if (status === 2) {
      return (
        <Badge containerStyle={{ backgroundColor: yellow }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: white }}>Hold</Text>
        </Badge>
      );
    }
    if (status === 3) {
      return (
        <Badge containerStyle={{ backgroundColor: success }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: white }}>Success</Text>
        </Badge>
      );
    }
    return (
      <Badge containerStyle={{ backgroundColor: danger }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: black }}>Failed</Text>
      </Badge>
    );
  }
}
