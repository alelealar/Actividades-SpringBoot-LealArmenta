/*
Hacemos la funcion timer para darle el tiempo de 3000ms
*/
function timer(callback){
    setTimeout(() =>{
        callback(); //llamamos el callback
    }, 3000) //3 segundos
}

//llamamos a la funcion timer donde dentro esta una funcion con el mensaje a mostrar
timer(function(){
    console.log(`Termino la espera`)
})