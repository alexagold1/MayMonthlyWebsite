document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("rosterGrid");
  const sortSelect = document.getElementById("sortAZ");
  const positionSelect = document.getElementById("filterPosition");
  const heightSelect = document.getElementById("filterHeight");

  function toInches(heightStr) {
    const [feet, inches] = heightStr.split("'").map(Number);
    return feet * 12 + (inches || 0);
  }

  function render(playersToShow) {
    grid.innerHTML = "";
    playersToShow.forEach((player, index) => {
      grid.innerHTML += `
      <div class="col-6 col-md-4 col-lg-2 d-flex">
        <div class="card shadow-sm w-100 h-100">
          <img src="${player.photo}" class="card-img-top player-img" alt="${player.firstName} ${player.lastName}">
          <div class="card-body text-center">
            <h5 class="card-title mb-1">${player.firstName} ${player.lastName}</h5>
            <div class="badge bg-primary mb-2">${player.position}</div>
            <p class="small text-muted mb-0">Age ${player.age}</p>
            <button class="btn btn-sm btn-outline-primary mt-2" data-index="${index}" data-bs-toggle="modal" data-bs-target="#funFactModal">
              More Info
            </button>
          </div>
        </div>
      </div>
    `;
    });

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const player = playersToShow[btn.dataset.index];
        showFunFact(player);
      });
    });
  }
  function showFunFact(player) {
    const funFactElement = document.getElementById("modalFunFact");
    funFactElement.textContent = player.funFact || "No fun fact available.";
  }

  function updateRoster() {
    // Mapping function: abbreviation -> category
    function getCategory(positionAbbr) {
      if (positionAbbr === "PG" || positionAbbr === "SG") return "Guard";
      if (positionAbbr === "PF") return "Forward";
      if (positionAbbr === "C") return "Center";
      return "";
    }

    let filtered = [...players];

    // Filter by position using mapping
    if (positionSelect.value) {
      filtered = filtered.filter(
        (p) => getCategory(p.position) === positionSelect.value
      );
    }

    // Filter by height
    if (heightSelect.value) {
      filtered = filtered.filter((p) => {
        const inches = toInches(p.height);
        return heightSelect.value === "tall" ? inches >= 80 : inches < 80;
      });
    }

    // Sort players
    if (sortSelect.value === "az") {
      filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortSelect.value === "za") {
      filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }

    render(filtered);
  }

  // Add event listeners
  sortSelect.addEventListener("change", updateRoster);
  positionSelect.addEventListener("change", updateRoster);
  heightSelect.addEventListener("change", updateRoster);

  updateRoster(); // initial render
});
