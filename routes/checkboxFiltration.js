const express = require('express');
const router = express.Router();
const window = require('../models/window');
const entranceDoor = require('../models/entranceDoor');
const interiorDoor = require('../models/interiorDoor');
const furnitura = require('../models/furnitura');
const filtrationFn = require('../filtrationFn');

router.post('/', async(req, res) => {
  try{
    // все продукты
    const products = [];
    const accArr = [];
    const interiorDoors = await interiorDoor.find({});
    const entranceDoors = await entranceDoor.find({});
    const furnituras = await furnitura.find({});
    const windows = await window.find({});

    products.push(...interiorDoors);
    products.push(...entranceDoors);
    products.push(...furnituras);
    products.push(...windows);
    


    // фильтрация по массиву условий

    for(let item of req.body){
      accArr.push(...filtrationFn(products, item.producerName, item.filtrationField))
    }


    res.status(200).json(accArr)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router