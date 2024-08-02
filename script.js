document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

  const mainContainer = document.querySelector(".main-container");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonWeight = document.getElementById("weight");
  const pokemonHeight = document.getElementById("height");
  const pokemonImage = document.getElementById("pokemon-image");
  const pokemonTypes = document.getElementById("types");
  const hpStats = document.getElementById("hp");
  const attackStats = document.getElementById("attack");
  const defenseStats = document.getElementById("defense");
  const specialAttackStats = document.getElementById("special-attack");
  const specialDefenceStats = document.getElementById("special-defense");
  const speedStats = document.getElementById("speed");
  let count = 1;

  searchButton.addEventListener("click", () => {
    fetchDetails();
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchDetails();
    }
  });

  const fetchDetails = async () => {
    try {
      const inputValue = searchInput.value.toLowerCase();
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log(data);
      const mappingItem = data.results.find(
        (item) =>
          item.id === parseInt(inputValue) ||
          item.name.toLowerCase() === inputValue
      );
      if (mappingItem) {
        const { url } = mappingItem;
        console.log(url);
        dataFetching(url);
      } else {
        alert("Pokémon not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataFetching = async (url) => {
    let data;
    const res = await fetch(url);
    data = await res.json();
    dataMapping(data);
  };

  const dataMapping = (data) => {
    const { id, name, height, weight, sprites, stats, types } = data;
    const { front_default } = sprites;
    const [
      hpValue,
      attackValue,
      defenseValue,
      spAttackValue,
      spDefenseValue,
      speedValue,
    ] = stats.map((stat) => stat.base_stat);
    const typesName = types.map((type) => type.type.name);

    console.log(
      id,
      name,
      height,
      weight,
      front_default,
      hpValue,
      attackValue,
      defenseValue,
      spAttackValue,
      spDefenseValue,
      speedValue,
      typesName
    );

    pokemonName.textContent = name;
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonImage.src = front_default;
    pokemonImage.id = "sprite";
    // Clear previous types
    pokemonTypes.innerHTML = "";
    typesName.forEach((pokemon) => {
      const listItem = document.createElement("li");
      listItem.textContent = pokemon;
      pokemonTypes.appendChild(listItem);
    });

    hpStats.textContent = hpValue;
    attackStats.textContent = attackValue;
    defenseStats.textContent = defenseValue;
    specialAttackStats.textContent = spAttackValue;
    specialDefenceStats.textContent = spDefenseValue;
    speedStats.textContent = speedValue;
  };
});
