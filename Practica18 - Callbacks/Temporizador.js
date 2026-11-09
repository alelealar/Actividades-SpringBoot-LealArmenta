function timer(callback){
    setTimeout(() =>{
        console.log(`Si funciona`)
        callback();
    }, 3000)
}

timer(function(){
    console.log(`Termino la espera`)
})