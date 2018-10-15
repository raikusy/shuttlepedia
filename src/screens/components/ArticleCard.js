import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default class ArticleCard extends Component {
  render() {
    const { title, featured_image, news_site_long } = this.props; //eslint-disable-line
    return (
      <Card title={title} image={{ uri: featured_image }}>
        <Text style={{ marginBottom: 10 }}>{news_site_long}</Text>
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
