const express = require('express');
const router = express.Router();
const productProducer = require('../models/productProducer');

router.get('/', async(req, res) => {
  try{
    const productProducers = await productProducer.find({});

    res.status(200).json(productProducers);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.get('/:id', async(req, res) => {
  try{
    const productProducer = await productProducer.findById(req.params.id);
    res.status(200).json(productProducer);
  } catch(e){
    res.status(500).json(e);
  }
})

router.post('/', async (req, res) => {
  
  try{
    console.log(req.body)
    const { producerName, filtrationField } = req.body;
    
    const product = new productProducer({
      producerName,
      filtrationField
    })
    await product.save();
    
    res.status(201).json(product);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.put('/:id', async (req, res) => {
  const {producerName, filtrationField} = req.body;
  const update = {producerName, filtrationField};
  try{
    const updatedProductProducer = await productProducer.findByIdAndUpdate(
      req.params.id,
      update
    );
    res.status(200).json(updatedProductProducer)
  } catch(e){
    res.status(500).json(e);
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const product = await productProducer.deleteOne({
      _id: req.params.id})
      
    res.status(200).json(product)
  } catch(e) {
    res.status(500).json(e);
  }
})

module.exports = router;