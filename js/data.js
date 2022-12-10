import { fetchJson } from "./bootstrap/utils.js";
import {
  pokemonURL,
  spinner,
  tableContainer,
  tableHeader,
} from "./variables.js";
import { generateDetail, generateTableItem } from "./components.js";

let pokemons = [];

const loadDataAll = async ({ url }) => {
  const { results } = await fetchJson(url);
  return await Promise.all(results.map((it) => fetchJson(it.url))).catch((e) =>
    console.warn(e)
  );
};

const generateTables = (data) => {
  const { id, types, name, weight, height } = data;
  const type = types[0].type.name;
  tableContainer.innerHTML += generateTableItem({
    id,
    name,
    type,
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
  const data = await loadDataAll({ url: pokemonURL });
  spinner.classList.add("d-none");
  tableHeader.classList.remove("d-none");
  pokemons = [...data];
  pokemons.forEach(generateTables);
  await getDetails();
};

function searchByName(searchIn, searchFor) {
  return searchIn.toLowerCase().includes(searchFor.toLowerCase());
}

export const searchPokemon = ({ keyword }) => {
  if (!keyword.length) {
    tableHeader.classList.remove("d-none");
    pokemons.forEach(generateTables);
  }

  const filter = pokemons.filter((poke) => searchByName(poke.name, keyword));
  if (filter.length === 0) {
    document.getElementById("empty").classList.remove("d-none");
    tableHeader.classList.add("d-none");
  } else {
    document.getElementById("empty").classList.add("d-none");
  }
  filter.forEach(generateTables);
};
