// =====================================
// Sistema de Gestión de Tareas
// =====================================

/*
INSTRUCCIONES GENERALES:

1. Lee cuidadosamente cada sección.
2. Completa únicamente donde se indica con TODO.
3. No borres la estructura base.
4. Agrega comentarios explicando tu lógica.
5. Prueba cada función antes de continuar.
6. NO USAR INTELIGENCIA ARTIFICIAL.
*/


// =====================================
// 1. Arreglo inicial de tareas
// =====================================

/*
Cada tarea tiene:
- nombre: string
- prioridad: number (1 = alta, 2 = media, 3 = baja)
- completada: boolean
*/

const tareas = [
  { nombre: "Ir a la playa", prioridad: 1, completada: false },
  { nombre: "Estudiar JS", prioridad: 2, completada: true },
  { nombre: "Ver películas", prioridad: 3, completada: false }
];


// =====================================
// 2. Funciones
// =====================================

/*
TODO 1:
Crear una función que recorra el arreglo de tareas
y muestre en consola:
- nombre de la tarea
- estado: "Completada" o "Pendiente"
*/
function mostrarTareas(lista) {
  // for..of pasa por cada objeto de la lista
  for(const dato of tareas){
    //imprimimos tomando de cada objeto de la lista (dato) los atributos necesarios para imprimirlos
    console.log(`Nombre: ${dato.nombre}, estado: ${dato.completada}`)
  }
}


/*
TODO 2:
Crear una función flecha que retorne
solo las tareas completadas.
Usar filter.
*/
const obtenerCompletadas = (lista) => { //cuando hay corchetes necesitas hacer un return

  //filter pasa por cada elemento de la lista buscando el atributo estado que sea completado
  return console.log(lista.filter(tarea => tarea.completada === true))
};


/*
TODO 3:
Crear una función flecha que retorne
solo las tareas pendientes.
Usar filter.
*/
const obtenerPendientes = (lista) => { //cuando hay corchetes necesitas hacer un return
  return console.log(lista.filter(tarea => tarea.completada === false))
}; 



/*
TODO 4:
Crear una función flecha que retorne
solo los nombres de las tareas.
Usar map.
*/
const obtenerNombres = (lista) => {
  return console.log(lista.map(tarea => `Nombre: ${tarea.nombre}`))
};


/*
TODO 5:
Crear una función que retorne
el total de tareas.
*/
function contarTareas(lista) {
  //length regresa el total de las tareas
  return console.log(lista.length);
}


// =====================================
// 3. Objeto sistema
// =====================================

/*
TODO 6:
Completar los métodos usando this.tareas

- mostrarTareas: debe llamar a la función mostrarTareas
- mostrarCompletadas: debe usar obtenerCompletadas
- mostrarPendientes: debe usar obtenerPendientes
*/

const sistema = {
  tareas: tareas,

  mostrarTareas: function() {
    mostrarTareas(this.tareas)
  },

  mostrarCompletadas: function() {
    obtenerCompletadas(this.tareas)
  },

  mostrarPendientes: function() {
    obtenerPendientes(this.tareas)
  }
};


// =====================================
// 4. Condicionales
// =====================================

/*
TODO 7:

- Si el arreglo tareas está vacío:
  mostrar "No hay tareas"

- Si todas las tareas están completadas:
  mostrar "Todas las tareas completadas"
*/
function hayTareas(lista){
  if(lista.length == 0){
    console.log("No hay Tareas");
    return;
  }

  if((lista.filter(completada => completada.completada == true).length) == lista.length){
    console.log("Todas las tareas completadas");
    return; 
  }
}


// =====================================
// 5. Switch
// =====================================

/*
TODO 8:

Usar la variable opcion para ejecutar:

1 -> mostrar todas las tareas
2 -> mostrar tareas completadas
3 -> mostrar tareas pendientes
default -> mostrar "Opción inválida"
*/

const opcion = 2;

switch (opcion) {
  case 1:
    console.log(mostrarTareas(tareas));
    break;

  case 2:
    console.log(obtenerCompletadas(tareas));
    break;

  case 3:
    console.log(obtenerPendientes(tareas));
    break;

  default:
    console.log("Opción inválida");
}


// =====================================
// 6. Pruebas
// =====================================

/*
TODO 9:

Llamar funciones para comprobar que todo funciona correctamente.
Usar console.log donde sea necesario.
*/
console.log("\nMostrar Tareas")
mostrarTareas(tareas);
console.log("\nMostrar Tareas completadas")
obtenerCompletadas(tareas);
console.log("\nMostrar Tareas pendientes")
obtenerPendientes(tareas);
console.log("\nMostrar nombres de tareas")
obtenerNombres(tareas);
console.log("\nContar Tareas")
contarTareas(tareas);

console.log("\n\n3. Objetos sistema")
console.log("\nMostrar Tareas")
sistema.mostrarTareas();
console.log("\nMostrar Tareas completadas")
sistema.mostrarCompletadas();
console.log("\nMostrar Tareas pendientes")
sistema.mostrarPendientes();

console.log("\n\n4. Condicionales")
console.log("\nHay tareas")
hayTareas(tareas);