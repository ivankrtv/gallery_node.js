const fs = require("fs");
const photoDatabase = require("../database/photo.database.js");

const addPhoto = async function(req, res){
    if(req.file){
        console.log(req.file);
        const name = req.body.name;
        const imagename = req.file.filename;
        const mimetype = req.file.mimetype;
        const imagepath = req.file.path;
        const path = '/home/ivankrtv/nodejs/test_task/gallery_node.js/images/'; // Для храния в БД пути к картинке

        const PNG = 'image/png';
        const JPEG = 'image/jpeg';

        if( mimetype != PNG && mimetype != JPEG ){
            deleteImage(imagepath);
            return res.status(400).json({ message: "Неверное расширение изображения" });
        }

        try{
            fs.copyFileSync(imagepath, '../images/'+imagename);
            deleteImage(imagepath);
            if( await photoDatabase.addPhoto(name, path+imagename) )
                res.status(201).json({ message: "Фотография успешно добавлена" });
            else{
                deleteImage('../images/'+imagename); //Удаляем изображение, если не удалось внести его в БД, чтобы не захламлять пространство
                res.status(400).json({ message: "Произошла ошибка при добавлении фотографии" });
            }
        }
        catch(exception){
            deleteImage('../images/'+imagename);
            console.log(exception);
            res.status(500).json({ message: "Ошибка подключения к базе данных" });
        }
    }
    else{
        res.status(400).json({ message: "Изображение не было отправлено" });
    }
}

const getRandomImage = async function(req, res){
    try{
        const rowsCount = await photoDatabase.getRowsConut();
        if( rowsCount === undefined ){
            return res.status(400).json({ message: "Произошла ошибка при подключении к БД" });
        }
        // Получаем рандомное число в диапазоне от 0, до количества строк в таблице
        const randomPhoto = Math.floor(Math.random()*rowsCount[0].count);
        // Получаем картинку из таблицы, отсортированной по убыванию id, с отступом от начала равному рандомному числу
        const photo = await photoDatabase.getPhoto(randomPhoto);

        if( photo !== undefined ){
            res.status(200).json(photo);
        }
        else{
            res.status(400).json({ message: "Произошла ошибка при подключении к БД" });
        }
    }
    catch(exception){
        console.log(exception);
        res.status(500).json({ message: "Произошла ошибка при получении изобращений" });
    }
}

const getImages = async function(req, res){
    const numOfPart = req.params.numOfPart; // Получаем количество партий, полученные клиентом
                                            // чтобы определить с какого изображения нужно отправить следующую партию
    try{
        const offset = numOfPart * 9; 
        const images = await photoDatabase.getPartPhotos(offset);
        if(images === undefined){
            res.status(500).json({message: "Ошибка чтения из базы данных"});
        }
        res.status(200).json(images);
    }
    catch(exception){
        console.log(exception);
        res.status(400).json({ message: "Произошла ошибка при получении изобращений" });
    }
}

function deleteImage(imagepath){
    fs.unlink(imagepath, (err) => {
        console.log(err);
    })
}

module.exports = {
    addPhoto,
    getRandomImage,
    getImages
}