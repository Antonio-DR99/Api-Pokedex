async function buscar() {
    const namepokemon = document.getElementById("name").value.toLowerCase().trim();

    // Oculta el error antes de buscar
    document.getElementById("pokemon-error").style.display = 'none';

    try {
        const datos = await obtenerDatos(namepokemon);

        document.getElementById("name-pokemon").textContent = datos.name;
        document.getElementById("image-pokemon").innerHTML = `<img src="${datos.sprites.front_default}" alt="${datos.name}">`;

        document.getElementById("hp").textContent = "HP: " + datos.stats.find(s => s.stat.name === "hp").base_stat;
        document.getElementById("attack").textContent = "Attack " + datos.stats.find(s => s.stat.name === "attack").base_stat;
        document.getElementById("defense").textContent = "Defense " + datos.stats.find(s => s.stat.name === "defense").base_stat;
        document.getElementById("special-attack").textContent = "Special Attack " + datos.stats.find(s => s.stat.name === "special-attack").base_stat;
        document.getElementById("special-defense").textContent = "Special Defense " + datos.stats.find(s => s.stat.name === "special-defense").base_stat;
        document.getElementById("speed").textContent = "Speed: " + datos.stats.find(s => s.stat.name === "speed").base_stat;

        document.getElementById("pokemon-modal").style.display = 'block';
        console.log("nombre del pokemon: " + namepokemon);

    } catch (error) {
        // Ocultar el modal anterior
        document.getElementById("pokemon-modal").style.display = 'none';

        // Limpiar contenido anterior
        document.getElementById("image-pokemon").innerHTML = '';
        document.getElementById("name-pokemon").textContent = '';
        document.getElementById("hp").textContent = '';
        document.getElementById("attack").textContent = '';
        document.getElementById("defense").textContent = '';
        document.getElementById("special-attack").textContent = '';
        document.getElementById("special-defense").textContent = '';
        document.getElementById("speed").textContent = '';

        // Mostrar error
        document.getElementById("pokemon-error").style.display = 'block';

    }
}

async function obtenerDatos(namepokemon) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + namepokemon;
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Pokemon no encontrado");
        }
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

function cerrarModal() {
    document.getElementById('pokemon-modal').style.display = 'none';
}