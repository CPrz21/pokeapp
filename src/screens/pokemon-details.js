import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button
} from 'react-native';
import API from '../api/api';
import DetailsRow from '../components/pokemon-details-row'
export default class pokemonDetails extends Component{
  state = {
    pokemonApi:'',
    pokemonId: '',
    pokemonName: '',
    pokemonImage: '',
    pokemonHeight:'',
    pokemonWeight:'',
    pokemonXperience:'',
    pokemonType:'',
    pokemonHabilities:''
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const pokemonName = navigation.getParam('pokemon', 'pikachu');
    const pokemon = await API.getPokemon(pokemonName);
    console.log(pokemon);
    this.setState({
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      pokemonImage: pokemon.sprites,
      pokemonHeight: pokemon.height,
      pokemonWeight: pokemon.weight,
      pokemonXperience: pokemon.base_experience,
      pokemonType:pokemon.types,
      pokemonHabilities:pokemon.abilities
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{ uri : this.state.pokemonImage.front_default}}/>
          </View>
          <Button
          title="Add to Favorites"
          color="#3c5aa6"
          />
        </View>
        <DetailsRow label="Id:" text={this.state.pokemonId} />
        <DetailsRow label="Name:" text={this.state.pokemonName} />
        <DetailsRow label="Height:" text={this.state.pokemonHeight} />
        <DetailsRow label="Weight:" text={this.state.pokemonWeight} />
        <DetailsRow label="Experience:" text={this.state.pokemonXperience} />
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../assets/img/Pokemon-logo.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{

  },
  header:{
    paddingTop: 25,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  containerImage:{
    width: 190,
    height: 190,
    marginRight:15,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: '#3c5aa6',
    backgroundColor:'rgba(255, 203, 5, .3)',
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  logo:{
    width:100,
    height:100,
    resizeMode:'contain'
  }
});

