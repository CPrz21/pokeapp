import React, { Component } from 'react';
import {
  FlatList,
  View,
  Button,
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
  static navigationOptions = {
    title: 'My Favorites',
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3c5aa6',
      textAlign: 'center'
    },
    headerTitleStyle: {
      width: '80%',
      textAlign: 'center',
    }
  };

  state = {
    favorites:[]
  }

  async componentDidMount() {
    let favorite = await AsyncStorage.getItem('favorites');
    let favorites = JSON.parse(favorite);
    this.setState({
      favorites: favorites
    })
  }

  removeFavorites = async (pokemon) => {
    const removed = await StoragePokemon.removePokemon(pokemon);

    let deleteFavorite = this.state.favorites.findIndex(value => value.name === pokemon);
    this.state.favorites.splice(deleteFavorite, 1);
    this.setState({
      favorites: this.state.favorites.length > 0 ? this.state.favorites : []
    });

    ToastAndroid.showWithGravityAndOffset(
      `${pokemon} was removed!`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }
  removeAllFavorites = async () => {
      const removed = await StoragePokemon.removeAllPokemon();
      this.setState({
        favorites: []
      });
      ToastAndroid.showWithGravityAndOffset(
        `All favorite was removed!`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
  }

  renderEmpty = () => <Empty text="You Don´t have favorites yet" />;
  itemSeparator = () => <Separator color="#c7a008" />;
  renderItem = ({item}) => {
    return(
      < Favorites fnRemove={this.removeFavorites} {...item}/>
    )
  };
  render(){
    return(
      <Layout
      title='Your Favorites Pokemon'
      >
        <Button
          onPress={this.removeAllFavorites}
          title="Remove All"
          color = "#990033"
        />
        <FlatList
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