function obtenerPost(callback){
    //se hacer peticiones http
    fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => {
        console.log("Termine el get")
        callback();
    })
}

const ejecutarAlTerminar = () => {console.log("Finaliza el programa")}

console.log("inicia el programa")
obtenerPost(ejecutarAlTerminar);