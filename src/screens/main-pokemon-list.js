import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import PokemonList from '../containers/pokemon-list';
import API from '../api/api';

export default class MainPokemonList extends Component {
  static navigationOptions = {
      title: 'Home',
      headerTitleStyle: {alignSelf: 'center'},
      headerTintColor: 'white',
      headerStyle: {
      backgroundColor: '#3c5aa6',
      textAlign: 'center'
      },
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
      }
  };

  state = {
    pokemonList:[]
  }

  async componentDidMount() {
    const pokemons = await API.getAllPokemon();
    this.setState({
      pokemonList:pokemons
    });
  }

  render(){
    return(
      <View>
        <PokemonList
        list={this.state.pokemonList}
        />
      </View>
    )
  }
}