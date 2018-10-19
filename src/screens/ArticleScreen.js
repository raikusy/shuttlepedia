import React, { Component } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { getArticles } from '../redux/article';
import ArticleCard from './components/ArticleCard';
import { primaryColor, white } from '../colors';

export class ArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Space Articles',
    drawerLabel: 'Space Articles',
    headerLeft: (
      <Icon
        color={primaryColor}
        containerStyle={{ marginLeft: 10 }}
        onPress={() => navigation.openDrawer()}
        name="menu"
        underlayColor="transparent"
      />
    ),
  });

  componentDidMount() {
    this.props.getArticles();
  }

  onRefresh = () => {
    this.props.getArticles();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={!!this.props.article.loading} onRefresh={this.onRefresh} />
          }
          renderItem={({ item }) => <ArticleCard key={item._id} {...item} />}
          data={this.props.article.articles}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ article }) => ({
  article,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getArticles,
    },
    dispatch
  );

const ArticleScreenNavigator = createStackNavigator(
  {
    article: connect(
      mapStateToProps,
      mapDispatchToProps
    )(ArticleScreen),
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: white,
      },
      headerTintColor: primaryColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default ArticleScreenNavigator;
