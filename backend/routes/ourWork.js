const express = require('express');
const router = express.Router();
const upload = require('../upload');
const ourWork = require('../models/ourWork');

router.get('/', async(req, res) => {
  try{
    const ourWorks = await ourWork.find({});
    res.status(200).json(ourWorks);
  } catch(e) {
    res.status(500).json(e)
  }
})

router.get('/:id', async(req, res) => {
  try{
    const ourWork = await ourWork.findById(req.params.id);
    res.status(200).json(ourWork);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.post('/', upload.single('image'), async(req, res) => {
  try{
    const {imageAlt} = req.body;
    const {imageSrc} = req.file ? req.file.path : '';
    const image = new ourWork({
      imageSrc,
      imageAlt
    })
    if(req.file){
      image.imageSrc = req.file.path;
    }
    await image.save();
    res.status(200).json(image);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.put('/:id', upload.single('image'), async(req, res) => {
  try{
    const {imageAlt} = req.body;
    const {imageSrc} = req.file ? req.file.path : '';
    const update ={
      imageSrc,
      imageAlt
    }
    if(req.file){
      update.imageSrc = req.file.path;
    }
    const updatedOurWork = await ourWork.findByIdAndUpdate(
      req.params.id,
      update
    )
    res.status(200).json(updatedOurWork);
  } catch(e) {
    res.status(500).json(e);
  }  
})

router.delete('/:id', upload.single('image'), async(req, res) => {
  try{
    const deleted = await ourWork.deleteOne({
      _id: req.params.id
    })
    res.status(200).json(deleted)
  } catch(e) {
    res.status(500).json(e);
  }
})

module.exports = router;