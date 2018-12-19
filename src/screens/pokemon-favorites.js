import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import FavoriteList from '../containers/pokemon-favorite-list';

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


  render(){
    return(
      <View>
         <FavoriteList
        list={this.state.favorites}
        />
      </View>
    )
  }
}