export class interiorDoorModel{
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
    public finishingTheSurface: string[],
    public frameMaterial: string[],
    public structuralFeatures: string[],
    public openingType: string[],
    public installationType: string[],
    public openingMethod: string[],
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
    finishingTheSurface;
    frameMaterial;
    structuralFeatures;
    openingType;
    installationType;
    openingMethod;
    imageSrc;
    homePage;
  }
}