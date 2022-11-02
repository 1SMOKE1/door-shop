
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'Doorshop.dp.ua@gmail.com',
    pass: 'ingzschgmmqjnlct' 
  }
});

/*
   user: 'Doorshop.dp.ua@gmail.com',
  pass: 'ingzschgmmqjnlct' 
*/

function getCartLinesHTML(arr) { 
  let txt = ''; 
  
 
  for (var i = 0; i < arr.length; i++) { 
      txt += 
          `
          <div class="card-product">
            <div class="card-product-img-wrap">
              <img class="card-product-img" src=${arr[i].product.imageSrc} alt="">
            </div>
            <div class="card-product-body">
              <h2 class="font-h2"></h2>
              <p>ID продукту: ${arr[i].product._id}</p>
              <p>Назва продукту: ${arr[i].product.name}</p>
              <p>Кількість: ${arr[i].quantity}</p>
              <p>Ціна за одиницю товару: ${arr[i].product.price}.00 грн</p>
            </div>
          </div><br><br><br>`;
  } 
  
    
  return txt; 
}


module.exports = {
  sendOrderMessage: async function sendOrderMessage(req){
    try{
      const info = await transporter.sendMail({
        from: 'Doorshop.dp.ua@gmail.com',
        to: 'chumak.dp.ua@gmail.com', 
        subject: `Замовлення З door_shop`,
        html: `
        <h1>Ім'я замовника: ${req.name}</h1>
        <p>Адресса замовника: ${req.address}</p>
        <div>Товари замовника: ${getCartLinesHTML(req.cartLines)}</div>
        <p>Кінцева ціна замовлення: ${req.total_cost}</p>
        <p>Телефон замовника: ${req.phone}</p>
        <p>Тип оплати замовлення: ${req.kindOfPayvment}</p>
        `
      })
      console.log(info.messageId);
      console.log('email have send message succsessfully');
    } catch(err) { 
      console.log(err)
    }
  },
  sendConsultationMessage: async function(req){
    try{
      const info = await transporter.sendMail({
        from: 'Doorshop.dp.ua@gmail.com',
        to: 'chumak.dp.ua@gmail.com', 
        subject: `Замовлення консультації З door_shop`,
        html: `
        <h1>Ім'я замовника: ${req.name}</h1>
        <p>Телефон замовника: ${req.phone}</p>
        `
      })
      console.log(info.messageId);
      console.log('email have send message succsessfully');
    } catch(e) {
      console.log(e);
    }
  }
}