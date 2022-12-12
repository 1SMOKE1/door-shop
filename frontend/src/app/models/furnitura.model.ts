export class FurnituraModel{
  constructor(
  public typeOfProduct: string, // Тип продкута
  public brand: string, // Виробник
  public name: string, // Назва
  public country: string, // Країна виробник
  public guarantee: string, // Гарантійний термін
  public state: string, // Стан
  public price: number, // Ціна
  public installationPrice: number, // Ціна з установкою
  public inStock: string, // На складі
  public description: string, // Опис
  public _id: string,
  public imageSrc: string,
  public homePage?: boolean,
  ){
  typeOfProduct
  brand
  name
  country
  guarantee
  state
  price
  installationPrice
  inStock
  description
  _id
  imageSrc
  homePage
  }
}