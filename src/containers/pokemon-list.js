import React, { Component } from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import Layout from '../components/pokemon-list-layout';
import Empty from '../components/empty';
import Separator from '../components/vertical-separator'
import Pokemons from '../components/pokemons'

export default class PokemonList extends Component{
  // keyExtractor = (item) => item.id.toString();
  renderEmpty = () => <Empty text="No Existen Pokemon" />;
  itemSeparator = () => <Separator color="#c7a008" />;
  renderItem = ({item}) => {
    return(
      <Pokemons  {...item}/>
    )
  };
  render(){
    return(
      <Layout
      title='Pokemons Primera Generación'
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