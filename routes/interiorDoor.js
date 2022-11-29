const express = require('express');
const interiorDoor = require('../models/interiorDoor');
const router = express.Router();
const upload = require('../upload');


router.get('/', async(req, res) => {
  try{
    const interiorDoors = await interiorDoor.find({});
    res.status(200).json(interiorDoors);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async(req, res) => {
  try{
    const cur = await interiorDoor.findById(req.params.id);
    res.status(200).json(cur);
  } catch(err) {
    res.status(500).json(err);
  }
})

router.post('/', upload.single('image'), async(req, res) => {
  try{
    console.log(req.body)
    const 
    {typeOfProduct, name, brand, country,
    guarantee, state, price, installationPrice,
    inStock, description, finishingTheSurface, frameMaterial,
    structuralFeatures, openingType, installationType, openingMethod,
    homePage
    } = req.body;


    const {imageSrc} = req.file ? req.file.path : '';

    const newInteriorDoor = new interiorDoor({
      typeOfProduct,
      name,
      brand,
      country,
      guarantee,
      state,
      price,
      installationPrice,
      inStock,
      description,
      finishingTheSurface: JSON.parse(finishingTheSurface),
      frameMaterial: JSON.parse(frameMaterial),
      structuralFeatures: JSON.parse(structuralFeatures),
      openingType: JSON.parse(openingType),
      installationType: JSON.parse(installationType),
      openingMethod: JSON.parse(openingMethod),
      homePage, 
      imageSrc
    })
    if(req.file){
      newInteriorDoor.imageSrc = req.file.path;
    }
    

    await newInteriorDoor.save();
    res.status(200).json(newInteriorDoor)
  } catch(err) {
    res.status(500).json(err); 
  }
})
 

router.put('/:id', upload.single('image'), async(req, res) => {
  
 

  try{

    const 
    {typeOfProduct, name, brand, country,
    guarantee, state, price, installationPrice,
    inStock, description, finishingTheSurface, frameMaterial,
    structuralFeatures, openingType, installationType, openingMethod, 
    homePage
    } = req.body;

    const {imageSrc} = req.file ? req.file.path : '';


    /**
     * You are using bodyParser which does JSON.parse() itself.
     * So you don't need to use JSON.parse() here.
     */
    // finishingTheSurface = JSON.parse(finishingTheSurface);
    // frameMaterial = JSON.parse(frameMaterial);
    // structuralFeatures = JSON.parse(structuralFeatures);
    // openingType = JSON.parse(openingType);
    // installationType = JSON.parse(installationType);
    // openingMethod = JSON.parse(openingMethod);


    const updatedProd = new interiorDoor({
      typeOfProduct,
      name,
      brand,
      country,
      guarantee,
      state,
      price,
      installationPrice,
      inStock,
      description,
      finishingTheSurface,
      frameMaterial,
      structuralFeatures,
      openingType,
      installationType,
      openingMethod,
      homePage, 
      imageSrc,
    })

    if(req.file){
      updatedProd.imageSrc = req.file.path;
    }

    /**
     * You should include "_id" to updated object, otherwise you try
     * to assign "undefined" value to "_id" field which is immutable.
     * So you are getting appropriate error in this case.
     */
    updatedProd._id = req.params.id;
    
    
  

    const updated = await interiorDoor.findByIdAndUpdate(
      req.params.id,
      updatedProd
    )

   






    


    
 

    // const del = await interiorDoor.deleteOne(
    //   {_id: req.params.id}
    // );

    // if(req.file){
    //   updatedProd.imageSrc = req.file.path;
    // }

    // await updatedProd.save();
    


    res.status(201).json(updated);
  } catch(err) {
    res.status(500).json(err); 
  }
})

router.delete('/:id', async(req, res) => {
  try{
    const del = await interiorDoor.deleteOne(
      {_id: req.params.id});
    
      res.status(200).json(del);
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;