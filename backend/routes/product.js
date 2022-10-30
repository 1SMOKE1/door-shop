const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const upload = require('../upload');

router.get('/', async(req, res) => {
  try{
    const products = await Product.find({});

    res.status(200).json(products)
  } catch(e) {
    res.status(500).json(e)
  }
})

router.get('/:id', async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.post('/', upload.single('image'), async(req, res) => {
  try{
    const {
      name, price, installationPrice, brand, country, guarantee_time,
      state, in_stock, type_of_product, count_of_sealing_conturs, door_leaf_material,
      door_frame_material, door_purpose, door_fill, door_application, door_opening_method,
      door_type, door_opening_type, door_area_material, sail, home_page, description
     } = req.body

    const {imageSrc} = req.file ? req.file.path : '';

    
    const product = new Product({
      name,
      price,
      installationPrice,
      brand,
      country,
      guarantee_time,
      state,
      in_stock,
      type_of_product,
      count_of_sealing_conturs,
      door_leaf_material,
      door_frame_material,
      door_purpose,
      door_fill,
      door_application,
      door_opening_method,
      door_type,
      door_opening_type,
      door_area_material,
      imageSrc,
      sail,
      home_page,
      description
    })
    if(req.file){
      product.imageSrc = req.file.path;
    }
    await product.save();

    res.status(201).json(product);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.put('/:id', upload.single('image'), async (req, res) => {
  const {
    name, price, installationPrice, brand, country, guarantee_time,
    state, in_stock, type_of_product, count_of_sealing_conturs, door_leaf_material,
    door_frame_material, door_purpose, door_fill, door_application, door_opening_method,
    door_type, door_opening_type, door_area_material, sail, home_page, description
   } = req.body

   const {imageSrc} = req.file ? req.file.path : '';
   
  const update = {
    name,
    price,
    installationPrice,
    brand,
    country,
    guarantee_time,
    state,
    in_stock,
    type_of_product,
    count_of_sealing_conturs,
    door_leaf_material,
    door_frame_material,
    door_purpose,
    door_fill,
    door_application, 
    door_opening_method,
    door_type,
    door_opening_type, 
    door_area_material,
    imageSrc,
    sail,
    home_page,
    description
  }
  if(req.file){
    update.imageSrc = req.file.path;
  }
  try{
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update
    );
    res.status(200).json(product);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const product = await Product.deleteOne(
      {_id: req.params.id});
    
      res.status(200).json(product);
  } catch(e) {
    res.status(500).json(e);
  }
})

module.exports = router;