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
