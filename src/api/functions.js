import { AsyncStorage } from 'react-native';

class storagePokemon {
  async removePokemon(pokemon) {
    let pokemons = [];
    let favorite = await AsyncStorage.getItem('favorites');
    let favorites = JSON.parse(favorite);
    let deleteFavoriteStorage = favorites.findIndex(value => value.name === pokemon);
    let favoriteDeleted = favorites.splice(deleteFavoriteStorage, 1);
    pokemons = favorites;
    AsyncStorage.setItem('favorites', JSON.stringify(pokemons))
      .then(() => {
        console.log('It was removed successfully')
        return true;
      })
      .catch(() => {
        console.log('There was an error removing the pokemon')
        return false;
      });

  }
}

export default new storagePokemon();