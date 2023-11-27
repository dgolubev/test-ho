type PokemonSpecies = {
  id: number,
  evolution_chain: {
    url: string,
  },
};

type PokemonEvolutionChain = {
  id: number,
  chain: PokemonEvolutionChainBranch,
};

type PokemonEvolutionChainBranch = {
  evolution_details: PokemonEvolutionDetails[],
  evolves_to: PokemonEvolutionChainBranch[],
  is_baby: boolean,
  species: {
    name: string,
    url: string,
  },
};

type PokemonEvolutionDetails = {
};


export {
  PokemonSpecies,
  PokemonEvolutionChain,
  PokemonEvolutionChainBranch,
}
