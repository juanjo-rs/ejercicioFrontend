// Para acceder a los elementos del HTML ya no usamos document.getElementById —
// usamos document.querySelector, que acepta cualquier selector CSS (#id, .clase,
// etiqueta...) y no solo ids. Por ejemplo: document.querySelector("#filtro-nombre").

async function obtenerPersonajes() {
  // TODO: pide "https://rickandmortyapi.com/api/character" con fetch, conviértela
  const respuesta = await fetch("https://rickandmortyapi.com/api/character");
  const datos = await respuesta.json();
  // a JSON y devuelve el array de personajes (repasa el ejercicio 1 de la práctica).
  return datos.results;
}

function filtrarPorEstado(personajes, estado) {

  if (estado === ""){
    return personajes;
  }
  // TODO: si estado viene vacío, devuelve personajes tal cual. Si no, filtra
  return personajes.filter(function (personaje) {
    return personaje.status.toLowerCase()=== estado;
  })  
  // dejando solo los que coinciden (repasa el ejercicio 2 de la práctica).
}

function filtrarPorEspecie(personajes, especie) {

  if (especie === ""){
    return personajes;
  }  
  // TODO: si especie viene vacía, devuelve personajes tal cual. Si no, filtra
  return personajes.filter(function (personaje) {
    return personaje.species === especie
  })
  // dejando solo los que coinciden (repasa el ejercicio 3 de la práctica).
}

function ObtenerNombres(personajes){
    return personajes.map(function (personaje){
        return personaje.name
    })
}

function EncontrarNombre(personajes,nombre){
    return personajes.find(function (personaje){
        return personaje.name === nombre
    })
}

function AlguienMuerto(personajes){
    return personajes.some(function (personaje){
        return personaje.status === "Dead"
    })
}

function TodosVivos(personajes){
    return personajes.every(function (personaje) {
        return personaje.status === "Alive"
    })
}

function OrdenarAlfabeticamente(personajes){
    return personajes.sort(function (a,b) {
        return a.name.localeCompare(b.name)
    })
}

function MostrarPorCantidad(personajes, cantidad){
    return personajes.slice(0,cantidad)
}

function PosicionPorNombre(personajes, nombre){
    const nombres = [...ObtenerNombres(personajes)]
    return nombres.indexOf(nombre)
}

function CuantosVivos(personaje){
    return personaje.reduce(function (total, personaje){
        return personaje.status === "Alive" ? total + 1 : total
    },0)
}
let personajes = [];

function aplicarFiltros() {
  const nombre = document.querySelector("#filtro-nombre").value.trim().toLowerCase();
  const estado = document.querySelector("#filtro-estado").value;
  const especie = document.querySelector("#filtro-especie").value;

  let filtrados = filtrarPorEstado(personajes, estado);
  filtrados = filtrarPorEspecie(filtrados, especie);
  filtrados = filtrados.filter(function (personaje) {
    return personaje.name.toLowerCase().includes(nombre);
  });

  pintarResultados(filtrados);
}

function pintarResultados(lista) {
  const contenedor = document.querySelector("#resultados");
  document.querySelector("#contador").textContent = lista.length + " personajes encontrados";

  contenedor.innerHTML = lista
    .map(function (personaje) {
      return (
        '<article class="personaje-card">' +
        '<img src="' + personaje.image + '" alt="' + personaje.name + '" />' +
        "<h3>" + personaje.name + "</h3>" +
        "<p>" + personaje.status + " · " + personaje.species + "</p>" +
        "</article>"
      );
    })
    .join("");
}

document.querySelector("#filtro-nombre").addEventListener("input", aplicarFiltros);
document.querySelector("#filtro-estado").addEventListener("change", aplicarFiltros);
document.querySelector("#filtro-especie").addEventListener("change", aplicarFiltros);

obtenerPersonajes().then(function (datos) {
  personajes = datos;
  aplicarFiltros();
});