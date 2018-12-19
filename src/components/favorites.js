import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
} from 'react-native'
import { withNavigation } from 'react-navigation';
// import EStyleSheet from 'react-native-extended-stylesheet';

class Favorites extends Component {
deleteFavorite = async (item) => {
  let pokemons = [];
  let favorite = await AsyncStorage.getItem('favorites');
  let favorites = JSON.parse(favorite);
  let deleteFavorite = favorites.findIndex(value => value.name === item);
  let favoriteDeleted = favorites.splice(deleteFavorite, 1);
  pokemons = favorites;
  AsyncStorage.setItem('favorites', JSON.stringify(pokemons))
    .then(() => {
      console.log('It was saved successfully')
    })
    .catch(() => {
      console.log('There was an error saving the product')
    });
}
render(){
  return(
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Image style={styles.image} source={{uri : this.props.image}} />
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
      <Button
        onPress={() => this.deleteFavorite(this.props.name)}
        title="Remove"
        color="red"
      />
    </View>
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

export default withNavigation(Favorites);