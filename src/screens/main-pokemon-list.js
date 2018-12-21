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
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerTitleStyle: {alignSelf: 'center'},
      headerTintColor: 'white',
      headerStyle: {
      backgroundColor: '#3c5aa6',
      textAlign: 'center'
      },
      headerTitleStyle: {
        width: '100%',
        textAlign: 'center',
      },
      headerRight: (
      <Button
        onPress={() => navigation.navigate('Favorites')}
        title="FAVS"
        color="red"
      />
    ),
    };
  };

  state = {
    pokemonList:[],
    list:[],
    textFilter:''
  }

  async componentDidMount() {
    const pokemons = await API.getAllPokemon();
    this.setState({
      pokemonList:pokemons,
      list: pokemons
    });
  }

  filterPokemon = () => {
    let pokemons = this.state.list;
    let regex = new RegExp(this.state.textFilter.toLowerCase(), 'g');
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