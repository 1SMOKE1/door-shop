const express = require('express');
const entranceDoor = require('../models/entranceDoor');
const router = express.Router();
const upload = require('../upload');





router.get('/', async(req, res) => {
  try{
    const entranceDoors = await entranceDoor.find({});
    res.status(200).json(entranceDoors);
  } catch(err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async(req, res) => {
  try{
    const cur = await entranceDoor.findById(req.params.id);

    res.status(200).json(cur)
  } catch(err) {
    res.status(500).json(err);
  }
})

router.post('/', upload.single('image'), async(req, res) => {
  try{
    console.log(req.body)
    const {typeOfProduct, name, brand, country,
    guarantee, state, price, installationPrice,
    inStock, description, amountOfSealingMaterials, fabricMaterial,
    purpose, openingMethod, covering, frameMaterial,
    homePage} = req.body;

    const {imageSrc} = req.file ? req.file.path : '';
    
    const newEntranceDoor = new entranceDoor({
      typeOfProduct,
      name,
      brand,
      guarantee,
      state,
      price,
      country,
      installationPrice,
      inStock,
      description,
      amountOfSealingMaterials,
      fabricMaterial,
      purpose,
      openingMethod,
      covering,
      frameMaterial,
      homePage,
      imageSrc
    })
    if(req.file){
      newEntranceDoor.imageSrc = req.file.path;
    }

    await newEntranceDoor.save();

    res.status(200).json(newEntranceDoor)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.put('/:id', upload.single('image'), async(req, res) => {
  try{
    const {typeOfProduct, name, brand, country,
    guarantee, state, price, installationPrice,
    inStock, description, amountOfSealingMaterials, fabricMaterial,
    purpose, openingMethod, covering, frameMaterial,
    homePage} = req.body;

    const {imageSrc} = req.file ? req.file.path : '';

    const update = new entranceDoor({
      typeOfProduct,
      name,
      brand,
      guarantee,
      state,
      price,
      country,
      installationPrice,
      inStock,
      description,
      amountOfSealingMaterials,
      fabricMaterial,
      purpose,
      openingMethod,
      covering,
      frameMaterial,
      homePage,
      imageSrc
    })
    if(req.file){
      update.imageSrc = req.file.path;
    }

    const updated = await entranceDoor.findByIdAndUpdate(
      req.params.id,
      update
    )

    res.status(200).json(updated)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async(req, res) => {
  try{  
    const del = await entranceDoor.deleteOne({
      _id: req.params.id,
    })

    res.status(200).json(del)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router;