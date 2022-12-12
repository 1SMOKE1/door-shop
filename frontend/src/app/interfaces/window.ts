export interface windowI{
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
  profile: string | string[], // Профіль
  construction:  string | string[], // Конструкція
  glassUnit: string | string[], // Стеклопакети
  lamination: string | string [], // Ламінація
  glasses: string | string[], // Стекла
  imageSrc: string;
  homePage?: boolean,
}