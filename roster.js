document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("rosterGrid");
  const sortAZ = document.getElementById("sortAZ");
  const filterPosition = document.getElementById("filterPosition");
  const filterHeight = document.getElementById("filterHeight");

  const render = (list) => {
    grid.innerHTML = "";
    list.forEach((p) => {
      const col = document.createElement("div");
      col.className = "col-6 col-lg-2";
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.photo}" class="card-img-top" alt="${p.firstName} ${p.lastName}">
          <div class="card-body text-center">
            <h5 class="card-title mb-1">${p.firstName} ${p.lastName}</h5>
            <div class="badge badge-position badge-pos-${p.position}">${p.position}</div>
            <p class="small text-muted mb-0">Age ${p.age}</p>
          </div>
        </div>`;
      grid.appendChild(col);
    });
  };

  const sortPlayers = (list, criteria) => {
    if (criteria === "az") {
      return list.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (criteria === "za") {
      return list.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }
    return list;
  };

  const filterPlayers = (list, position, height) => {
    return list.filter((p) => {
      let positionMatch = position ? p.position === position : true;
      let heightMatch = true;

      if (height === "tall") {
        heightMatch = p.height >= 6.8;
      } else if (height === "short") {
        heightMatch = p.height < 6.8;
      }

      return positionMatch && heightMatch;
    });
  };

  const updateRoster = () => {
    let sortedPlayers = sortPlayers(players, sortAZ.value);
    let filteredPlayers = filterPlayers(
      sortedPlayers,
      filterPosition.value,
      filterHeight.value
    );
    render(filteredPlayers);
  };

  // Add event listeners for the dropdowns
  sortAZ.addEventListener("change", updateRoster);
  filterPosition.addEventListener("change", updateRoster);
  filterHeight.addEventListener("change", updateRoster);

  // Initial render
  updateRoster();
});
