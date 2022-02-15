const { Router } = require("express");
const upload = require("./middleware.js");
const db = require("../database/connection");
const photoController = require("../controllers/photo.controller.js");

const router = Router();

router.get('/photo/:numOfPart', photoController.getImages);

router.post('/photo', upload, photoController.addPhoto);

router.get('/photo', photoController.getRandomImage);

module.exports = router;