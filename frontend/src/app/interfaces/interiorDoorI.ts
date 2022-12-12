// Двері міжкімнатні
export interface interiorDoorI{
  typeOfProduct: string, // Тип продкута
  brand: string, // Виробник
  name: string, // Назва
  country: string, // Країна виробник
  guarantee: string, // Гарантійний термін
  state: string, // Стан
  price: number, // Ціна
  installationPrice: number, // Ціна з установкою
  inStock: string, // На складі
  description: string, // Опис
  _id: string,
  finishingTheSurface: string[], // Оздоблення поверхні
  frameMaterial: string[], // Матеріали дверної коробки
  structuralFeatures: string[], // Конструктивні особливості
  openingType: string[], // Тип відкривання
  installationType: string[], // Тип монтажу
  openingMethod: string[], // Спосіб відкривання
  imageSrc: string,
  homePage?: boolean, // На головній сторінці
}