function filtrationFn(products, condBrand, condTypeOfProduct){
  let prods = [...products];
  prods = prods.filter((el) => el.brand === condBrand && el.typeOfProduct === condTypeOfProduct);
  return prods
}


module.exports = filtrationFn