import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default class RocketCard extends Component {
  render() {
    const { name, configuration, imageURL, family } = this.props;
    return (
      <Card title={name} image={{ uri: imageURL }}>
        <Text style={{ marginBottom: 10 }}>{configuration}</Text>
        <Text style={{ marginBottom: 10, textAlign: 'center' }}>{family && family.name}</Text>
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
