const pokemonList = document.getElementById("pokemon-list");
const pokemonDetail = document.getElementById("pokemon-detail");
const pokemonInfo = document.querySelector(".pokemon-info"); // Asegúrate de que sea .pokemon-info
const backButton = document.getElementById("back-button");

async function fetchPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await response.json();
    return pokemon;
}

function displayPokemon(pokemon) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p>ID: ${pokemon.id}</p>
    `;

    // Asignar la función correctamente al evento "click"
    pokemonCard.addEventListener("click", () => {
        showPokemonDetail(pokemon);  // Se asegura de pasar el objeto `pokemon` a showPokemonDetail
    });
    
    pokemonList.appendChild(pokemonCard); // Añadir el Pokémon a la lista
}

backButton.addEventListener("click", () => {
    pokemonDetail.style.display = "none";  // Ocultar los detalles del Pokémon
    pokemonList.style.display = "grid";    // Mostrar la lista de Pokémon
});

function showPokemonDetail(pokemon) {
    // Ocultar la lista de Pokémon y mostrar los detalles del Pokémon
    pokemonList.style.display = "none";  
    pokemonDetail.style.display = "block";
    
    // Asegurarse de que se actualice el contenido del div .pokemon-info
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p>Altura: ${(pokemon.height / 10).toFixed(1)} m</p>
        <p>Peso: ${(pokemon.weight / 10).toFixed(1)} kg</p>
        <p>Tipo: ${pokemon.types.map(p => p.type.name).join(", ")}</p>
    `;
}

async function loadPokedex() {
    for (let i = 1; i <= 150; i++) {  // Puedes reducir el rango a 10 para probar más rápido
        const pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon);
    }
}

loadPokedex();
