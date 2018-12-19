import React, { Component } from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import Layout from '../components/pokemon-list-layout';
import Empty from '../components/empty';
import Separator from '../components/vertical-separator'
import Favorites from '../components/favorites'

export default class PokemonList extends Component{
  // keyExtractor = (item) => item.id.toString();
  renderEmpty = () => <Empty text="You Don´t have favorites yet" />;
  itemSeparator = () => <Separator color="#c7a008" />;
  renderItem = ({item}) => {
    return(
      <Favorites  {...item}/>
    )
  };
  render(){
    return(
      <Layout
      title='Your Favorites Pokemon'
      >
        <FlatList
          // keyExtractor={this.keyExtractor}
          data = { this.props.list }
          ListEmptyComponent = {this.renderEmpty}
          ItemSeparatorComponent = {this.itemSeparator}
          renderItem = { this.renderItem }
        />
      </Layout>
    )
  }
}