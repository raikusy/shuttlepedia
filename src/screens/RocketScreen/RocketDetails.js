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

import { getSingleRocket } from '../../redux/singleRocket';
import { white, success, primaryColor } from '../../colors';

class RocketDetails extends Component {
  static navigationOptions = () => ({
    title: 'Rocket Details',
  });

  componentDidMount() {
    const { getParam } = this.props.navigation;
    const id = getParam('id');
    this.props.getSingleRocket(id);
  }

  onRefresh = () => {
    const { getParam } = this.props.navigation;
    const id = getParam('id');
    this.props.getSingleRocket(id);
  };

  render() {
    const { singleRocket } = this.props;
    const { name, configuration, family, imageURL, infoURLs, wikiURL } = singleRocket.data;

    if (singleRocket.loading) {
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
          <RefreshControl refreshing={!!singleRocket.loading} onRefresh={this.onRefresh} />
        }
        style={{ backgroundColor: white }}
      >
        {imageURL && <Image style={{ height: 200 }} source={{ uri: imageURL }} />}
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10, fontSize: 24, textAlign: 'center' }}>{name}</Text>
          <Text>Configuration: {configuration}</Text>
          <Text>Family: {family && family.name}</Text>
          <View>
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
                  Linking.openURL(wikiURL);
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
                  Linking.openURL(infoURLs[0]);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ singleRocket }) => ({
  singleRocket,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSingleRocket,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RocketDetails);
