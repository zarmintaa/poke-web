import { loadPageData, loadTables, searchPokemon } from "./data.js";
import { loadTrigger, searchInput, tableContainer } from "./variables.js";

window.addEventListener("DOMContentLoaded", loadTables);

searchInput.addEventListener("input", () => {
  tableContainer.innerHTML = "";
  searchPokemon({ keyword: searchInput.value });
});

loadTrigger.addEventListener("click", loadPageData);
