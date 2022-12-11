import {
  cardContainer,
  loadTrigger,
  pokemonURL,
  searchInput,
  spinner,
  spinnerLoad,
  tableContainer,
  tableHeader,
} from "./variables.js";
import { generateCard, generateDetail } from "./components.js";
import { fetchJson, includes } from "./utils.js";

let pokemons = [];
let limit = 10;

const loadDataAll = async ({ url }) => {
  const { results } = await fetchJson(url);
  if (!results) {
    return [];
  }
  return await Promise.all(results.map((it) => fetchJson(it.url))).catch((e) =>
    console.warn(e)
  );
};

const loadCards = async () => {
  const data = await loadDataAll({
    url: `${pokemonURL}?limit=${limit}&offset=0`,
  });
  spinner.classList.add("d-none");
  // tableHeader.classList.remove("d-none");
  pokemons = [...data];
  pokemons.forEach(showCards);
  loadTrigger.classList.remove("d-none");
  await getDetails();
};

const showCards = (data) => {
  const { id, types, name } = data;
  const type = types[0].type.name;
  cardContainer.innerHTML += generateCard({ id, name, types });
};

const getDetails = async () => {
  const cardItem = document.querySelectorAll("#card-item");
  cardItem.forEach((node) => {
    node.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      console.log(id);
      const modalContainer = document.getElementById("modal-container");
      const data = pokemons.filter((poke) => poke.id.toString() === id)[0];
      const { name, stats } = data;
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      modalContainer.innerHTML = generateDetail({ stats, image, name });
    });
  });
};
const searchPokemon = ({ keyword }) => {
  loadTrigger.classList.add("d-none");

  if (!keyword.length) {
    loadTrigger.classList.remove("d-none");
    pokemons.forEach(showCards);
  }

  const filter = pokemons.filter((poke) =>
    includes({ searchIn: poke.name, searchFor: keyword })
  );
  if (filter.length === 0) {
    document.getElementById("empty").classList.remove("d-none");
  } else {
    document.getElementById("empty").classList.add("d-none");
  }
  filter.forEach(showCards);
};

searchInput.addEventListener("input", () => {
  cardContainer.innerHTML = "";
  searchPokemon({ keyword: searchInput.value });
});

const loadPageData = async () => {
  spinnerLoad.classList.remove("d-none");
  loadTrigger.classList.add("d-none");
  limit += 10;
  pokemons = await loadDataAll({
    url: `${pokemonURL}?limit=${limit}&offset=0`,
  });
  cardContainer.innerHTML = "";
  pokemons.forEach(showCards);
  spinnerLoad.classList.add("d-none");
  loadTrigger.classList.remove("d-none");
  await getDetails();
};

searchInput.addEventListener("input", () => {
  cardContainer.innerHTML = "";
  searchPokemon({ keyword: searchInput.value });
});

window.addEventListener("DOMContentLoaded", loadCards);

loadTrigger.addEventListener("click", loadPageData);
