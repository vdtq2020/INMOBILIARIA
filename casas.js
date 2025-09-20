let casasData = [];

async function cargarCasas() {
  const response = await fetch("casasdb.json");
  casasData = await response.json();
  mostrarCasas(casasData);
}

function mostrarCasas(casas) {
  const casasGrid = document.querySelector(".casas-grid");
  casasGrid.innerHTML = "";
  casas.forEach((casa) => {
    const casaItem = document.createElement("div");
    casaItem.className = "casas-item";
    casaItem.setAttribute("data-casa-id", casa.id);

    casaItem.innerHTML = `
      <img src="${casa.image}" alt="${casa.title}" />
      <div class="casas-info">
        <h3>${casa.title}</h3>
        <p>${casa.description}</p>
        <div class="casas-details">
          <span class="price">${casa.price}</span>
          <span class="location">${casa.location}</span>
        </div>
      </div>
    `;

    casaItem.addEventListener("click", () => {
      mostrarDetallesCasa(casa.id);
    });

    casasGrid.appendChild(casaItem);
  });
}

function mostrarDetallesCasa(casaId) {
  const casa = casasData.find((c) => c.id === casaId);

  document.getElementById("modalImage").src = casa.image;
  document.getElementById("modalTitle").textContent = casa.title;

  const modalInfo = `
    <p><strong>Precio:</strong> ${casa.price}</p>
    <p><strong>Ubicación:</strong> ${casa.location}</p>
    <p><strong>Área:</strong> ${casa.area}</p>
    <p><strong>Habitaciones:</strong> ${casa.rooms}</p>
    <p><strong>Baños:</strong> ${casa.bathrooms}</p>
    <p><strong>Descripción:</strong> ${casa.description}</p>
  `;
  document.querySelector(".modal-info").innerHTML = modalInfo;

  document.getElementById("casasModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  document.getElementById("casasModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", function () {
  cargarCasas();
  document.querySelector(".close-btn").addEventListener("click", cerrarModal);
  document.getElementById("casasModal").addEventListener("click", function (e) {
    if (e.target === this) cerrarModal();
  });
});
