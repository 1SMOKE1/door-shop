const express = require('express');
const router = express.Router();
const upload = require('../upload');
const window = require('../models/window');

router.get('/', async(req, res) => {
  try{  
    const windows = await window.find({});
    res.status(200).json(windows);
  } catch(err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async(req, res) => {
  try{
    const oneWindow = await window.findById(req.params.id);
    res.status(200).json(oneWindow);
  } catch(err) {
    res.status(500).json(err);
  }
})

router.post('/', upload.single('image'), async (req, res) => {
  try{

    const {typeOfProduct, brand, name, country,
    guarantee, state, price, installationPrice, 
    inStock, description, profile, construction,
    glassUnit, lamination, glasses, homePage} = req.body

    const {imageSrc} = req.file ? req.file.path : ''

    const newWindow = new window({
      typeOfProduct,
      brand,
      name,
      country,
      guarantee,
      state,
      price, 
      installationPrice,
      inStock,
      description,
      profile: JSON.parse(profile),
      construction: JSON.parse(construction),
      glassUnit: JSON.parse(glassUnit),
      lamination: JSON.parse(lamination),
      glasses: JSON.parse(glasses),
      imageSrc,
      homePage
    })

    if(req.file){
      newWindow.imageSrc = req.file.path
    }



    await newWindow.save();
    res.status(200).json(newWindow)
  } catch(err) {
    res.status(500).json(err);
  }
})

router.put('/:id', upload.single('image'), async (req, res) => {
  try{
    const {typeOfProduct, brand, name, country,
    guarantee, state, price, installationPrice, 
    inStock, description, profile, construction,
    glassUnit, lamination, glasses, homePage} = req.body

    const {imageSrc} = req.file ? req.file.path : ''

    const updateWindow = new window({
    typeOfProduct, brand, name, country,
    guarantee, state, price, installationPrice, 
    inStock, description, profile, construction,
    glassUnit, lamination, glasses, homePage, imageSrc
    })

    if(req.file){
      updateWindow.imageSrc = req.file.path;
    }

    updateWindow._id = req.params.id;

    updateWindow.profile = JSON.parse(profile);
    updateWindow.construction = JSON.parse(construction);
    updateWindow.glassUnit = JSON.parse(glassUnit);
    updateWindow.lamination = JSON.parse(lamination);
    updateWindow.glasses = JSON.parse(glasses);

    const updated = await window.findByIdAndUpdate(
      req.params.id,
      updateWindow
    )

    res.status(200).json(updated)
  } catch(err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', async(req, res) => { 
  try{
    const del = await window.findByIdAndDelete(
      req.params.id
    )
    res.status(200).json(del);
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;