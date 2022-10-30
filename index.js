const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');




const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const productProducerRoutes = require('./routes/productProducer');
const ourWorksRoutes = require('./routes/ourWork');
const ourCommentsRouter = require('./routes/ourComment');
const consultationFormRouter = require('./routes/consultationForm')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// mongodb://localhost:27017/door_shop

mongoose.connect('mongodb+srv://kamyshan19:kamyshan19@door-shop.yqrrsud.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, (err) => {
  if(err){
    console.log(err);
    return;
  } 
  
  console.log('mongodb connected');
  


  app.listen(PORT, () => {
    console.log('server starts work on port ' + PORT)
  });
})

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/product-producers', productProducerRoutes);
app.use('/api/our-works', ourWorksRoutes);
app.use('/api/our-comments', ourCommentsRouter);
app.use('/api/consultation-form', consultationFormRouter);
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('dist/door_shop_angular'))
