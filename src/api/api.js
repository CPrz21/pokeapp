const BASE_API = 'https://pokeapi.co/api/v2/'

class Api {
  async getAllPokemon() {
    const query = await fetch(`${BASE_API}generation/1/`);
    const data = await query.json();
    return data.pokemon_species;
  }
  async getPokemon(pokemon) {
    const query = await fetch(`${BASE_API}pokemon/${pokemon}/`);
    const data = await query.json();
    return data;
  }
}

export default new Api();