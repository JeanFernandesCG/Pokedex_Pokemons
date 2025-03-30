const pokeApi = {};
function convertPokeApiDetailPokemon(pokemonsDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokemonsDetail.order;
  pokemon.name = pokemonsDetail.name;

  const types = pokemonsDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokemonsDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonsDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
