import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Avatar } from 'react-native-elements';

import { primaryColor } from '../../colors';

export default class RocketCard extends Component {
  render() {
    const { name, configuration, imageURL, family } = this.props;
    return (
      <Card>
        <View style={{ flexDirection: 'row' }}>
          <Avatar large rounded source={{ uri: imageURL }} activeOpacity={0.7} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ marginBottom: 10, fontSize: 20 }}>{name}</Text>
            <Text style={{ marginBottom: 10 }}>Configuration: {configuration}</Text>
            <Text style={{ marginBottom: 10 }}>{family && `Family: ${family.name}`}</Text>
          </View>
        </View>
        <Button
          icon={{ name: 'rocket', type: 'font-awesome', color: primaryColor }}
          title="LEARN MORE"
          buttonStyle={{
            backgroundColor: 'white',
            borderColor: primaryColor,
            borderWidth: 0,
            borderRadius: 5,
            padding: 5,
          }}
          containerViewStyle={{
            marginLeft: 'auto',
          }}
          textStyle={{ color: primaryColor }}
        />
      </Card>
    );
  }
}
