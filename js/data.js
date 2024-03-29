import { fetchJson } from "./utils.js";
import {
  loadTrigger,
  pokemonURL,
  spinner,
  spinnerLoad,
  tableContainer,
  tableHeader,
} from "./variables.js";
import { generateDetail, generateTableItem } from "./components.js";

export let pokemons = [];
export let limit = 10;

export const loadDataAll = async ({ url }) => {
  const { results } = await fetchJson(url);
  if (!results) {
    return [];
  }
  return await Promise.all(results.map((it) => fetchJson(it.url))).catch((e) =>
    console.warn(e)
  );
};

const generateTables = (data) => {
  const { id, types, name, weight, height } = data;
  const type = types[0].type.name;
  const typeString = types.map((e) => e.type.name).join(", ");
  tableContainer.innerHTML += generateTableItem({
    id,
    name,
    type: typeString,
    weight,
    height,
  });
};

const getDetails = async () => {
  const tableItems = document.querySelectorAll(".table");
  tableItems.forEach((node) => {
    node.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const modalContainer = document.getElementById("modal-container");
      const data = pokemons.filter((poke) => poke.id.toString() === id)[0];
      const { name, stats } = data;
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      modalContainer.innerHTML = generateDetail({ stats, image, name });
    });
  });
};

export const loadTables = async () => {
  const data = await loadDataAll({
    url: `${pokemonURL}?limit=${limit}&offset=0`,
  });
  spinner.classList.add("d-none");
  tableHeader.classList.remove("d-none");
  pokemons = [...data];
  pokemons.forEach(generateTables);

  await getDetails();
};

function searchByName({ searchIn, searchFor }) {
  return searchIn.toLowerCase().includes(searchFor.toLowerCase());
}

export const searchPokemon = ({ keyword }) => {
  loadTrigger.classList.add("d-none");

  if (!keyword.length) {
    loadTrigger.classList.remove("d-none");
    tableHeader.classList.remove("d-none");
    pokemons.forEach(generateTables);
  }

  const filter = pokemons.filter((poke) =>
    searchByName({ searchIn: poke.name, searchFor: keyword })
  );
  if (filter.length === 0) {
    document.getElementById("empty").classList.remove("d-none");
    tableHeader.classList.add("d-none");
  } else {
    document.getElementById("empty").classList.add("d-none");
  }
  filter.forEach(generateTables);
};

export const loadPageData = async () => {
  spinnerLoad.classList.remove("d-none");
  loadTrigger.classList.add("d-none");
  limit += 10;
  pokemons = await loadDataAll({
    url: `${pokemonURL}?limit=${limit}&offset=0`,
  });
  tableContainer.innerHTML = "";
  pokemons.forEach(generateTables);
  spinnerLoad.classList.add("d-none");
  loadTrigger.classList.remove("d-none");
  await getDetails();
};
