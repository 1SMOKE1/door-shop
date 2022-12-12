export class windowModel{
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
    public profile: string | string[], // Профіль
    public construction:  string | string[], // Конструкція
    public glassUnit: string | string[], // Стеклопакети
    public lamination: string | string [], // Ламінація
    public glasses: string | string[], // Стекла
    public imageSrc: string,
    public homePage?: boolean,
    
  ){
    typeOfProduct;
    brand;
    name;
    country;
    guarantee;
    state;
    price;
    installationPrice;
    inStock;
    description;
    _id;
    profile;
    construction;
    glassUnit;
    lamination;
    glasses;
    homePage;
  }
  
}