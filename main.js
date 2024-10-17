const pokemonList = document.getElementById("pokemon-list");
const pokemonDetail = document.getElementById("pokemon-detail");
const pokemonInfo = document.querySelector(".pokemon-info");
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


    pokemonCard.addEventListener("click", () => {
        showPokemonDetail(pokemon);  
    });
    
    pokemonList.appendChild(pokemonCard); 
}

backButton.addEventListener("click", () => {
    pokemonDetail.style.display = "none";  
    pokemonList.style.display = "grid";  
});

function showPokemonDetail(pokemon) {

    pokemonList.style.display = "none";  
    pokemonDetail.style.display = "block";
    

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
