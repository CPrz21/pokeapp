import React, { Component } from 'react';
import {
  FlatList,
  View,
  Image,
  Button,
  Text,
  AsyncStorage,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import Layout from '../components/pokemon-list-layout';
import Empty from '../components/empty';
import Separator from '../components/vertical-separator';
import Favorites from '../components/favorites';
import StoragePokemon from '../api/functions';

export default class pokemonFavorites extends Component {
  state = {
    favorites:[]
  }

  async componentDidMount() {
    let favorite = await AsyncStorage.getItem('favorites');
    let favorites = JSON.parse(favorite);
    console.log(favorites);
    this.setState({
      favorites: favorites
    })
  }

  removeFavorites = async (pokemon) => {
    const removed = await StoragePokemon.removePokemon(pokemon);

    let deleteFavorite = this.state.favorites.findIndex(value => value.name === pokemon);
    this.state.favorites.splice(deleteFavorite, 1);
    // console.log(this.state.favorites);
    this.setState({
      favorites: this.state.favorites
    });

    ToastAndroid.showWithGravityAndOffset(
      `${pokemon} was removed!`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }


  // keyExtractor = (item) => item.id.toString();
  renderEmpty = () => <Empty text="You Don´t have favorites yet" />;
  itemSeparator = () => <Separator color="#c7a008" />;
  renderItem = ({item}) => {
    console.log(item);
    return(
      < Favorites fnRemove={this.removeFavorites} {...item}/>
    )
  };
  render(){
    return(
      <Layout
      title='Your Favorites Pokemon'
      >
        <FlatList
          // keyExtractor={this.keyExtractor}
          keyExtractor={(item, index) => index.toString()}
          data = { this.state.favorites }
          ListEmptyComponent = {this.renderEmpty}
          ItemSeparatorComponent = {this.itemSeparator}
          renderItem = {this.renderItem}
        />
      </Layout>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  containerInfo:{
    flexDirection:'row',
    alignItems: 'center',
  },
  image:{
    width:100,
    height:100
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5aa6',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },

});