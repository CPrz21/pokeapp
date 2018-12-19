import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  CheckBox,
  Button,
  AsyncStorage
} from 'react-native';
import API from '../api/api';
import DetailsRow from '../components/pokemon-details-row'
import { withNavigation } from 'react-navigation';

class pokemonDetails extends Component{
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
    let favorite = await AsyncStorage.getItem('favorites');
    let favorites = JSON.parse(favorite);
    let findFavorite = favorites.filter(value => value.name === pokemonName);
    const pokemon = await API.getPokemon(pokemonName);
    console.log(pokemon);
    this.setState({
      checked: findFavorite.length > 0 ? true : false,
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

  addToFavorites = async () => {
      let pokemons=[];
      let favorite = await AsyncStorage.getItem('favorites');

      let favorites = JSON.parse(favorite);
      console.log(favorites);


      if (!this.state.checked){
        if (!favorites) {
          pokemons.push({
            name: this.state.pokemonName,
            image: this.state.pokemonImage.front_default
          });
        }else{
          pokemons = favorites;
          pokemons.push({
            name: this.state.pokemonName,
            image: this.state.pokemonImage.front_default
          });
        }
      }else{
        let deleteFavorite = favorites.findIndex(value => value.name === this.state.pokemonName);
        let favoriteDeleted = favorites.splice(deleteFavorite, 1);

        pokemons = favorites;
      }

      console.log(pokemons);
      // AsyncStorage.setItem('favorites', pokemons);

      AsyncStorage.setItem('favorites', JSON.stringify(pokemons))
        .then(() => {
          console.log('It was saved successfully')
        })
        .catch(() => {
          console.log('There was an error saving the product')
        });

      this.setState({
        checked: !this.state.checked
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{ uri : this.state.pokemonImage.front_default}}/>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={this.state.checked}
              onValueChange={ this.addToFavorites }
            />
            <Text style={styles.checkboxText}>{this.state.checked ? 'Added to favorites' : 'Add to favorites'}</Text>
          </View>
        </View>
        <DetailsRow label="Id:" text={this.state.pokemonId} />
        <DetailsRow label="Name:" text={this.state.pokemonName} />
        <DetailsRow label="Height:" text={this.state.pokemonHeight} />
        <DetailsRow label="Weight:" text={this.state.pokemonWeight} />
        <DetailsRow label="Experience:" text={this.state.pokemonXperience} />
        <View style={styles.button}>
          <Button
          onPress={() => this.props.navigation.navigate('Favorites')}
          title = "go to favorites"
          color = "#3c5aa6"/>
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
  checkboxContainer:{
    flexDirection: 'row'
  },
  checkboxText: {
    marginTop: 5,
    fontSize:18
  },
  logoContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  logo:{
    width:100,
    height:100,
    resizeMode:'contain'
  },
  button:{
    marginTop:25
  }
});

export default withNavigation(pokemonDetails);