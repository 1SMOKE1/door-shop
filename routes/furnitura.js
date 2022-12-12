const express = require('express');
const router = express.Router();
const upload = require('../upload');
const furnitura = require('../models/furnitura');

router.get('/', async(req, res) => {
  try{
    const furnituras = await furnitura.find({});

    res.status(200).json(furnituras)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async(req, res) => {
  try{
    const current = await furnitura.findByIdAndUpdate(req.params.id);
    
    res.status(200).json(current)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/', upload.single('image'), async(req, res) => {
  try{
    const {typeOfProduct, brand, name, country,
      guarantee, state, price, installationPrice, 
      inStock, description, homePage } = req.body

    const {imageSrc} = req.file ? req.file.path : ''

    const newFurnitura = new furnitura({
      typeOfProduct, brand, name, country,
      guarantee, state, price, installationPrice, 
      inStock, description, homePage, imageSrc
    })
    if(req.file){
      newFurnitura.imageSrc = req.file.path
    }

    await newFurnitura.save();

    res.status(200).json(newFurnitura)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.put('/:id', upload.single('image'), async(req, res) => {
  try{
    const {typeOfProduct, brand, name, country,
      guarantee, state, price, installationPrice, 
      inStock, description, homePage } = req.body

    const {imageSrc} = req.file ? req.file.path : ''

    const updatedFurnitura = new furnitura({
      typeOfProduct, brand, name, country,
      guarantee, state, price, installationPrice, 
      inStock, description, homePage, imageSrc
    })

    if(req.file){
      updatedFurnitura.imageSrc = req.file.path
    }

    updatedFurnitura._id = req.params.id;

    const updated = await furnitura.findByIdAndUpdate(
      req.params.id,
      updatedFurnitura
    )

    res.status(200).json(updated)
  } catch(err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', async(req, res) => {
  try{
    const del = await furnitura.findByIdAndDelete(
      req.params.id
    )
    res.status(200).json(del);
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router