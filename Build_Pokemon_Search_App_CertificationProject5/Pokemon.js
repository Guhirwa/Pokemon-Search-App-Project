// Grab all necessary DOM elements by their IDs
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonNameElement = document.getElementById('pokemon-name');
const pokemonIdElement = document.getElementById('pokemon-id');
const weightElement = document.getElementById('weight');
const heightElement = document.getElementById('height');
const typesElement = document.getElementById('types');
const hpElement = document.getElementById('hp');
const attackElement = document.getElementById('attack');
const defenseElement = document.getElementById('defense');
const specialAttackElement = document.getElementById('special-attack');
const specialDefenseElement = document.getElementById('special-defense');
const speedElement = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');

// Function to reset all displayed information
function clearDisplay() {
  pokemonNameElement.textContent = '';
  pokemonIdElement.textContent = '';
  weightElement.textContent = '';
  heightElement.textContent = '';
  typesElement.innerHTML = '';
  hpElement.textContent = '';
  attackElement.textContent = '';
  defenseElement.textContent = '';
  specialAttackElement.textContent = '';
  specialDefenseElement.textContent = '';
  speedElement.textContent = '';
  spriteContainer.innerHTML = '';
}

// Function to fetch and display Pokémon entry
async function fetchPokemonData() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`
    );
    if (!response.ok) throw new Error('Pokémon not found');
    const entry = await response.json();

    // Update the display with the Pokémon's entry
    pokemonNameElement.textContent = entry.name.toUpperCase();
    pokemonIdElement.textContent = `#${entry.id}`;
    weightElement.textContent = `Weight: ${entry.weight}`;
    heightElement.textContent = `Height: ${entry.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${entry.sprites.front_default}" alt="${entry.name} sprite">
    `;

    // Display the types
    typesElement.innerHTML = entry.types
      .map(
        type => `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`
      )
      .join('');

    // Display the stats
    hpElement.textContent = entry.stats[0].base_stat;
    attackElement.textContent = entry.stats[1].base_stat;
    defenseElement.textContent = entry.stats[2].base_stat;
    specialAttackElement.textContent = entry.stats[3].base_stat;
    specialDefenseElement.textContent = entry.stats[4].base_stat;
    speedElement.textContent = entry.stats[5].base_stat;
  } catch (error) {
    clearDisplay();
    alert('Pokémon not found');
  }
}

// Event listener for the search button
searchButton.addEventListener('click', event => {
  event.preventDefault();
  fetchPokemonData();
});