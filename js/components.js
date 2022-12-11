import { colors } from "./variables.js";

export const generateTableItem = ({ id, name, type, weight, height }) => {
  return ` <tr>
            <th scope="row">${id}</th>
            <td>${name}</td>
            <td>${type}</td>
            <td>${weight}</td>
            <td>${height}</td>
            <td>
              <button class="btn badge special-attack" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${id}">Detail</button>
            </td>
          </tr>`;
};

export const generateDetail = ({ stats, image, name }) => {
  return `<div class="row">
              <div class="col-lg-6 text-center">
                <div class="img-detail img-bounce">
                  <img
                    src="${image}"
                    alt=""
                    class="img-fluid"
                  />
                  <h4>${name}</h4>
                </div>
              </div>
              <div class="col-lg-6 gy-3 fs-1">
                <h4 class="text-center mb-3">Statistics</h4>
                <div class="progress my-3">
                  <div
                    class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    role="progressbar"
                    aria-label="Success example"
                    style="width: ${stats[0].base_stat}%"
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    HP - ${stats[0].base_stat}
                  </div>
                </div>
                <div class="progress my-3">
                  <div
                    class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                    role="progressbar"
                    aria-label="Danger example"
                    style="width: ${stats[1].base_stat}%"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Attack - ${stats[1].base_stat}
                  </div>
                </div>
                <div class="progress my-3">
                  <div
                    class="progress-bar defence progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-label="Info example"
                    style="width: ${stats[2].base_stat}%"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="200"
                  >
                    Defence - ${stats[2].base_stat}
                  </div>
                </div>
                <div class="progress my-3">
                  <div
                    class="progress-bar special-attack progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-label="Warning example"
                    style="width: ${stats[3].base_stat}%"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Special Attack - ${stats[3].base_stat}
                  </div>
                </div>
                <div class="progress my-3">
                  <div
                    class="progress-bar special-defence progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-label="Warning example"
                    style="width: ${stats[4].base_stat}%"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Special Defence - ${stats[4].base_stat}
                  </div>
                </div>
                <div class="progress my-3">
                  <div
                    class="progress-bar speed progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-label="Warning example"
                    style="width: ${stats[5].base_stat}%"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Speed - ${stats[5].base_stat}
                  </div>
                </div>
              </div>
            </div>`;
};

export const generateCard = ({ id, name, types }) => {
  return `<div class="col-lg-3 col-mb-4 col-sm-6"  style="cursor: pointer">
          <div class="card style-card border-0 position-relative">
            <div
              class="d-flex align-items-center justify-content-center"
            >
              <img
                style="max-height: 180px; max-width: 180px"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
                class="card-img-top"
                alt="..."
              />
            </div>
            <h4 class="card-subtitle mb-2 text-muted position-absolute top-0 p-3">#${id}</h4>
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center">

                <h3 class="card-title" id="card-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${id}">${name}</h3>
              </div>
              ${typeItem({ types }).outerHTML}
            </div>
          </div>
        </div>`;
};

const generateSpanTypePokemon = ({ type }) => {
  const span = document.createElement("span");
  span.classList.add("badge");
  span.style.backgroundColor = colors[`${type}`];
  span.innerText = type;
  return span;
};

const typeItem = ({ types }) => {
  const div = document.createElement("div");
  div.classList.add("d-flex", "mt-1", "gap-2");
  const arr = [];
  types.forEach((it) => {
    div.appendChild(generateSpanTypePokemon({ type: it.type.name }));
  });
  console.log(div);
  return div;
};
