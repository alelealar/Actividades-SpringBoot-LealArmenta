function decodeFilename(fileName){
    /*
        firstUnderscore = primer guion bajo
        buscamos la posicion de la primera aparicion de un guion bajo
    */
    const firstUnderscore= fileName.indexOf("_");
    /*
        tomamos la parte que necesitamos, que es despues del primer guion bajo hasta el final del string.
        le asignamos el nuevo string a newFileName
    */
    fileName= fileName.slice(firstUnderscore+1, fileName.length);
    /*
        lastExtension = ultima extension que es buscar el ultimo "."
        buscamos la posicion del ultimo punto en el string que es la extension extra
    */
    const lastExtension = fileName.lastIndexOf(".");
    /*
        hacemos slice a newFileName que ya no tiene los datos basura del inicio.
        Lo hacemos desde la posicion 0 hasta el ultimo "." encontrado (la extension extra)
        le asignamos este nuevo string a newFileName
    */
    fileName= fileName.slice(0, lastExtension)

    //devolvemos el fileName ya modificado/arreglado/limpio
    return fileName;
}


//PRUEBAS

console.log(decodeFilename('2023122512345678_gameAssets.png.tmp'));
// ➞ "gameAssets.png"

console.log(decodeFilename('42_user-data.json.backup'));
// ➞ "user-data.json"

console.log(decodeFilename('987654321_level-1-config.csv.old'))
// ➞ "level-1-config.csv"