import { BASE_URL } from "../config/constants";

/**
 *
 * @param {number} [limit]
 * @param {number} [offset]
 * @returns {Object[]}
 */
export const getPokemonList = async (limit = 40, page = 0) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${page * limit}`
  );
  const { results: pokemons, count } = await response.json();
  return { pokemons, count };
};

/**
 * @returns {Object[]}
 */
export const getPokemonTypes = async () => {
  const response = await fetch(`${BASE_URL}/type`);
  const { results: types } = await response.json();
  return types;
};

export const getPokemonDataFromName = async (name) => {
  if (!name) return;
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  const result = await response.json();
  return result;
};
