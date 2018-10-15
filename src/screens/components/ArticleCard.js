import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

import { primaryColor } from '../../colors';

export default class ArticleCard extends Component {
  render() {
    const { title, featured_image, news_site_long } = this.props; //eslint-disable-line
    return (
      <Card image={{ uri: featured_image }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, flex: 1, flexWrap: 'wrap' }}>
            <Text style={{ marginBottom: 10, fontSize: 20, flex: 1, flexWrap: 'wrap' }}>
              From: {news_site_long}
            </Text>
            <Text style={{ marginBottom: 10, flex: 1, flexWrap: 'wrap' }}>{title}</Text>
            <Button
              icon={{ name: 'book', type: 'font-awesome5', color: primaryColor }}
              title="READ MORE"
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
          </View>
        </View>
      </Card>
    );
  }
}
