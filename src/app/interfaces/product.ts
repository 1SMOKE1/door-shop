import { isStocking, productType } from "../models/product.model";

export interface ProductI{
  name: string,
  _id: string,
  price: number,
  installationPrice: number,
  brand: string,
  country: string,
  guarantee_time: string,
  state: string,
  in_stock: isStocking,
  type_of_product: productType,
  count_of_sealing_conturs: number,// Кількість ущільнюючих котнурів
  door_leaf_material: string,// Матеріал дверного полотна
  door_frame_material: string,// Матеріал дверної коробки
  door_purpose: string,// Призначення двері(ціль)
  door_fill: string,// Наповнення дверей
  door_application: string,// Застосування дверей (Остановился тут)
  door_opening_method: string,// Метод відкривання дверей
  door_type: string,// Тип дверей
  door_opening_type: string,
  door_area_material: string
  imageSrc: string,
  sail: string,
  home_page: boolean,
  description: string,
}