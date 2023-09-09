// Create header text
const header = document.createElement("header");
header.classList.add("header");
header.textContent = "Pokedex";
document.body.prepend(header);

// Create navigation div
const divNavigation = document.createElement("div");
divNavigation.classList.add("navigation");
document.body.insertBefore(
  divNavigation,
  document.getElementById("pokedex-container")
);

// Create sumType paragraph
const pSumType = document.createElement("p");
pSumType.classList.add("sumType");
document.body.insertBefore(
  pSumType,
  document.getElementById("pokedex-container")
);

const sortedPokemon = {};
function sortPokemonType(pokedex) {
  pokedex.forEach((p) => {
    p.type.forEach((type) => {
      if (type in sortedPokemon) {
        sortedPokemon[type].push(p);
      } else {
        sortedPokemon[type] = [p];
      }
    });
  });
}

function createHeader(types) {
  types.sort();
  types.forEach((type) => {
    const span = document.createElement("nav");
    span.textContent = type;
    span.addEventListener("click", () => {
      showPokemonOfType(type);
      const count = sortedPokemon[type].length;
      console.log("sortedPokemon[type] length:", sortedPokemon[type].length);
      let totalHp = 0;
      let totalAttack = 0;
      sortedPokemon[type].forEach((p) => {
        totalHp = totalHp + p.base.HP;
        totalAttack = totalAttack + p.base.Attack;
      });

      pSumType.textContent = `Type: ${type} (${count}) Total HP: ${totalHp} | Total Attack: ${totalAttack}`;
    });
    divNavigation.appendChild(span);
  });
}

// Compute sum for each type
function sumType(types) {
  types.forEach((type) => {
    const count = sortedPokemon[type].length;
  });
}

// Gallery
const pokedexContainer = document.getElementById("pokedex-container");

function showPokemonOfType(type) {
  const pokemonOfType = sortedPokemon[type].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  pokedexContainer.innerHTML = "";

  pokemonOfType.forEach((pokemon) => {
    const pokemonDiv = document.createElement("div");

    const name = document.createElement("h2");
    name.textContent = pokemon.name;
    pokemonDiv.appendChild(name);

    const image = document.createElement("img");
    image.src = pokemon.sprite;
    image.alt = `${pokemon.name} - ${pokemon.type.join(" and ")} Type Pokemon`; // Add alt text here
    image.loading = "lazy";
    image.addEventListener("click", () => {
      window.location.href = pokemon.url;
    });
    pokemonDiv.appendChild(image);

    const details = document.createElement("table");
    details.classList.add("details");

    const { HP, Attack, Defense, Speed } = pokemon.base;
    const spAttack = pokemon.base["Sp. Attack"];
    const spDefense = pokemon.base["Sp. Defense"];

    // Create first row with HP and Attack
    const row1 = document.createElement("tr");
    const hpCell = document.createElement("td");
    hpCell.textContent = `HP: ${HP}`;
    const attackCell = document.createElement("td");
    attackCell.textContent = `Attack: ${Attack}`;
    row1.appendChild(hpCell);
    row1.appendChild(attackCell);

    // Create second row with Defense and Speed
    const row2 = document.createElement("tr");
    const defenseCell = document.createElement("td");
    defenseCell.textContent = `Defense: ${Defense}`;

    const speedCell = document.createElement("td");
    speedCell.textContent = `Speed: ${Speed}`;
    row2.appendChild(defenseCell);

    row2.appendChild(speedCell);
    // Create third row with Sp. Attack and Sp. Defense
    const row3 = document.createElement("tr");
    const spAttackCell = document.createElement("td");
    spAttackCell.textContent = `Sp. Attack: ${spAttack}`;
    const spDefenseCell = document.createElement("td");
    spDefenseCell.textContent = `Sp. Defense: ${spDefense}`;

    row3.appendChild(spAttackCell);
    row3.appendChild(spDefenseCell);

    // Add rows to the table
    details.appendChild(row1);
    details.appendChild(row2);
    details.appendChild(row3);

    pokemonDiv.appendChild(details);

    pokedexContainer.appendChild(pokemonDiv);
  });
}

function createPokemonSpecification() {
  sortPokemonType(pokedex);
  const poki = Object.keys(sortedPokemon);
  createHeader(poki);
  showPokemonOfType(poki[0]);
}

createPokemonSpecification();
console.log(sortedPokemon);
