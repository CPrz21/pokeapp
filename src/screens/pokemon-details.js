import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  CheckBox,
  Button,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import API from '../api/api';
import DetailsRow from '../components/pokemon-details-row'
import { withNavigation } from 'react-navigation';
import StoragePokemon from '../api/functions';

class pokemonDetails extends Component{
  static navigationOptions = {
    title: 'Pokemon Details',
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
    let findFavorite = favorites ? favorites.filter(value => value.name === pokemonName) : [];
    const pokemon = await API.getPokemon(pokemonName);
    var type=[];
    var abilities = [];
    pokemon.abilities.forEach((value) => {
      abilities.push(value.ability.name)
    });
    pokemon.types.forEach((value) => {
      type.push(value.type.name)
    });
    this.setState({
      checked: findFavorite.length > 0 ? true : false,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      pokemonImage: pokemon.sprites,
      pokemonHeight: pokemon.height,
      pokemonWeight: pokemon.weight,
      pokemonXperience: pokemon.base_experience,
      pokemonType: type.join(", "),
      pokemonHabilities: abilities.join(", ")
    });
  }

  addToFavorites = async () => {
    let pokemons=[];
      let favorite = await AsyncStorage.getItem('favorites');

      let favorites = JSON.parse(favorite);
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

      AsyncStorage.setItem('favorites', JSON.stringify(pokemons))
        .then(() => {
          ToastAndroid.showWithGravityAndOffset(
            `${this.state.pokemonName} added to your favorites!`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        })
        .catch(() => {
          ToastAndroid.showWithGravityAndOffset(
            `Sorry we have problems with ${this.state.pokemonName}`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        });

      this.setState({
        checked: !this.state.checked
      });
  }
  render() {
    return (
      <View>
        <View style={styles.topLogo}>
          <Image style={styles.logo} source={require('../assets/img/Pokemon-logo.png')} />
        </View>
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
        <DetailsRow label="Abilities:" text={this.state.pokemonHabilities} />
        <DetailsRow label="Type:" text={this.state.pokemonType} />
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
  topLogo:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:10
  },
  logo:{
    width: 150,
    height: 50,
    resizeMode: 'contain'
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
    width: 150,
    height: 150,
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
    flexDirection: 'row',
    flex:1
  },
  checkboxText: {
    marginTop: 5,
    fontSize:14
  },
  button:{
    marginTop:25
  }
});

export default withNavigation(pokemonDetails);