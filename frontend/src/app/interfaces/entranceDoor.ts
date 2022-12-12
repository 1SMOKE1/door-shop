// Двері вхідні
export interface entranceDoorI {
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
  amountOfSealingMaterials: string | string[], // Кількість ущільнюючих контурів
  fabricMaterial: string | string[], // Матеріл дверного полотна
  purpose: string | string[], // Призначення двері
  openingMethod: string | string[], // Спосіб відкривання
  covering: string | string[], // Покриття
  frameMaterial: string | string[], // Матеріал дверної коробки
  imageSrc: string, 
  homePage?: boolean, // На головній сторінці
}