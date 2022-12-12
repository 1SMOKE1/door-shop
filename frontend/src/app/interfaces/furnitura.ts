// Фурнітура
export interface furnituraI {
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
  imageSrc: string,
  homePage?: boolean,
}