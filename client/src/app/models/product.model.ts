
export type isStocking = 'В наявності'|'Немає в наявності'|'Під замовлення';
export type productType = 'Двері вхідні' | 'Двері міжкімнатні' | 'Фурнітура';

export class ProductModel{
  constructor(
    public name: string,
    public _id: string,
    public price: number,
    public imageSrc: string,
    public installationPrice: number,
    public brand: string,
    public country: string,
    public guarantee_time: string = '12 місяців',
    public state: string,
    public in_stock: isStocking,
    public type_of_product: productType,
        // unic fields
    public count_of_sealing_conturs: number,// Кількість ущільнюючих котнурів
    public door_leaf_material: string,// Матеріал дверного полотна
    public door_frame_material: string,// Матеріал дверної коробки
    public door_purpose: string,// Призначення двері(ціль)
    public door_fill: string,// Наповнення дверей
    public door_application: string,// Застосування дверей (Остановился тут)
    public door_opening_method: string,// Метод відкривання дверей
    public door_type: string,// Тип дверей
    public door_opening_type: string,// Тип відкривання дверей
    public door_area_material: string,// Оздоблення поверхні дверей тільки міжкімнатні
    public sail: string,
    public home_page: boolean,
    public description: string
  ){
    name;
    _id;
    price;
    imageSrc;
    installationPrice;
    brand;
    country;
    guarantee_time = '12 місяців';
    state;
    in_stock;
    type_of_product;
    //     // unic fields
    count_of_sealing_conturs;// Кількість ущільнюючих котнурів
    door_leaf_material;// Матеріал дверного полотна
    door_frame_material;// Матеріал дверної коробки
    door_purpose;// Призначення двері(ціль)
    door_fill;// Наповнення дверей
    door_application;// Застосування дверей (Остановился тут)
    door_opening_method;// Метод відкривання дверей
    door_type;// Тип дверей
    door_opening_type;// Тип відкривання дверей
    door_area_material;//
    sail;
    description;
  }
}