export class entranceDoorModel{
  constructor(
  public typeOfProduct: string,
  public brand: string,
  public name: string,
  public country: string,
  public guarantee: string,
  public state: string,
  public price: number,
  public installationPrice: number,
  public inStock: string,
  public description: string,
  public _id: string,
  public amountOfSealingMaterials: string | string[],
  public fabricMaterial: string | string[],
  public purpose: string | string[],
  public openingMethod: string | string[],
  public covering: string | string[],
  public frameMaterial: string | string[],
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
  amountOfSealingMaterials;
  fabricMaterial;
  purpose;
  openingMethod;
  covering;
  frameMaterial;
  imageSrc;
  homePage;
  }
}