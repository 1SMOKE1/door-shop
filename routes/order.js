const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const {sendOrderMessage} = require('../nodemailer');

router.get('/', async (req, res) =>{
  try{
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.get('/:id', async (req, res) => {
  try{
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch(e) {
    res.status(500).json(e)
  }
})

router.post('/', async (req, res) => {
  const 
    {name, phone, address, email, cartLines, 
    shiped, total_cost, kindOfPayvment} = req.body;

    const newOrder = new Order({
      name,
      phone,
      address,
      email,
      cartLines,
      shiped,
      total_cost,
      kindOfPayvment,
    })
    
  try{
    sendOrderMessage(newOrder)
    await newOrder.save()

    res.status(200).json(newOrder);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.put('/:id', async (req, res) => {
  const 
      {name, phone, address, email,
      cartLines, shiped, total_cost, kindOfPayvment
      } = req.body;

    const updatedOrder = {
      name,
      phone,
      address,
      email,
      cartLines,
      shiped,
      total_cost,
      kindOfPayvment,
    }
  try{
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updatedOrder
    )
    res.status(200).json(order);
  } catch(e) {
    res.status(500).json(e);
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const order = await Order.deleteOne(
      {_id: req.params.id});
    
      res.status(200).json(order);
  } catch(e) {
    res.status(500).json(e)
  }
})

module.exports = router;