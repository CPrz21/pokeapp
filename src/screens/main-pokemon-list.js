import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
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
    pokemonList:[],
    list:[],
    textFilter:''
  }

  async componentDidMount() {
    const pokemons = await API.getAllPokemon();
    console.log(pokemons);

    this.setState({
      pokemonList:pokemons,
      list: pokemons
    });
  }

  filterPokemon = () => {
    let pokemons = this.state.list;
    let regex = new RegExp(this.state.textFilter, 'g');
    let filtered = pokemons.filter((value) => {
      return value.name.match(regex);
    });

    this.setState({
      pokemonList: filtered,
    });
  }

  render(){
    return(
      <View>
        <View style={styles.searchContainer}>
          <TextInput
          style={styles.searchInput}
          editable = {true}
          placeholder="Find Pokemon"
          onChangeText={(textFilter) => this.setState({textFilter})}
          value={this.state.textFilter}
          />
          <Button
            onPress={this.filterPokemon}
            title="Find Pokemon"
            color = "#c7a008"
          />
        </View>
        <PokemonList
        list={this.state.pokemonList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchContainer:{
    flexDirection: 'row',
    borderColor: '#3c5aa6',
    borderWidth: 5,
  },
  searchInput:{
    height: 40,
    borderColor: '#3c5aa6',
    borderWidth: 2,
    flex: 1
  }
});