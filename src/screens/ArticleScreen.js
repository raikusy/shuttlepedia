import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { getArticles } from '../redux/article';
import ArticleCard from './components/ArticleCard';

export class ArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Article',
    drawerLabel: 'Article',
    headerLeft: (
      <Icon
        color="#03A9F4"
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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={!!this.props.article.loading} onRefresh={this.onRefresh} />
        }
      >
        {!!this.props.article.articles.length &&
          this.props.article.articles.map(item => <ArticleCard key={item._id} {...item} />)}
      </ScrollView>
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
        backgroundColor: 'white',
      },
      headerTintColor: '#03A9F4',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default ArticleScreenNavigator;