const db = require("../database/connection.js");

const addPhoto = async function(name, imagename){
    try{
        await db.none('INSERT INTO photos(name, image) VALUES($1, $2)', [name, imagename]);
        return true;
    }
    catch(exception){
        console.log(exception);
        return false;
    }
}

const getPhoto = async function(offset){
    try{
        const imagename = await db.any('SELECT name, image FROM photos ORDER BY id DESC LIMIT 1 OFFSET $1', offset);
        return imagename;
    }
    catch(exception){
        console.log(exception);
        return undefined;
    }
}

const getPartPhotos = async function(offset){
    try{
        const imagename = await db.any('SELECT name, image FROM photos ORDER BY id ASC LIMIT 9 OFFSET $1', offset);
        return imagename;
    }
    catch(exception){
        console.log(exception);
        return undefined;
    }
}
const getRowsConut = async function(){
    try{
        const rowsCount = await db.any('SELECT COUNT(*) FROM photos');
        return rowsCount;
    }
    catch(exception){
        console.log(exception);
        return undefined;
    }
}

module.exports = {
    addPhoto,
    getPhoto,
    getPartPhotos,
    getRowsConut
}