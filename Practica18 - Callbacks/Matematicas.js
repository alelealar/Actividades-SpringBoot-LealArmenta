function operacion(a, b, callback){
    console.log(callback(a, b));
}


function suma(a, b){
    return a + b
}

function resta(a, b){
    return a - b
}

function multiplicacion(a, b){
    return a * b
}

function division(a, b){
    return a / b
}

console.log("\nSuma")
operacion(5, 10, suma);

console.log("\nResta");
operacion(5, 10, resta);

console.log("\nMultiplicación");
operacion(5, 10, multiplicacion);

console.log("\nDivisión");
operacion(5, 10, division);