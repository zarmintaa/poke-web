import { loadTables, searchPokemon } from "./data.js";
import { searchInput, tableContainer } from "./variables.js";

window.addEventListener("DOMContentLoaded", loadTables);

searchInput.addEventListener("input", () => {
  tableContainer.innerHTML = "";
  searchPokemon({ keyword: searchInput.value });
});
