import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import PokemonList from '../containers/pokemon-list';
import API from '../api/api';

export default class MainPokemonList extends Component {
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