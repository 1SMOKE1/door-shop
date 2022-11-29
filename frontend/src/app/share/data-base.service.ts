import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { carouselImageI } from '../interfaces/carouselImageI';
import { Observable } from 'rxjs';
import { ProductI } from '../interfaces/product';
import { Order } from '../models/order.model';
import { productProducerI } from '../interfaces/productProducer';
import { BASE_URL } from './constants/urls';
import { interiorDoorI } from '../interfaces/interiorDoorI';
import { entranceDoorI } from '../interfaces/entranceDoor';



@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  
  constructor(private http: HttpClient)  {}

  public getOurWorks(): Observable<carouselImageI[]>{
    return this.http.get<carouselImageI[]>(BASE_URL + '/api/our-works');
  }

  public createOurWorks(image: File | null): Observable<carouselImageI>{
    const formData = new FormData();
    if(image){
      formData.append('image', image, image.name);
    }
    return this.http.post<carouselImageI>(BASE_URL + '/api/our-works', formData);
  } 

  public updateOurWorks(id: string, image: File | null): Observable<carouselImageI>{
    const formData = new FormData();
    if(image){
      formData.append('image', image, image.name);
    }
    return this.http.put<carouselImageI>(BASE_URL + '/api/our-works/' + id, formData)
  }

  public deleteOurWorks(id: string): Observable<carouselImageI>{
    return this.http.delete<carouselImageI>(BASE_URL + '/api/our-works/' + id);
  }

  public getOurComments(): Observable<carouselImageI[]>{
    return this.http.get<carouselImageI[]>(BASE_URL + '/api/our-comments'); 
  }

  public createOurComments(image: File | null): Observable<carouselImageI>{
    const formData = new FormData();
    if(image){
      formData.append('image', image, image.name);
    }
    return this.http.post<carouselImageI>(BASE_URL + '/api/our-comments', formData);
  }

  public updateOurComments(id: string, image: File | null): Observable<carouselImageI>{
    const formData = new FormData();
    if(image){
      formData.append('image', image, image.name);
    }
    return this.http.put<carouselImageI>(BASE_URL + '/api/our-comments/' + id, formData)
  }

  public deleteOurComments(id: string): Observable<carouselImageI>{
    return this.http.delete<carouselImageI>(BASE_URL + '/api/our-comments/' + id);
  }

  public createProduct(product: ProductI, image: File | null): Observable<ProductI>{
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('installationPrice', product.installationPrice.toString());
    formData.append('brand', product.brand);
    formData.append('country', product.country);
    formData.append('guarantee_time', '12 Місяців');
    formData.append('state', product.state);
    formData.append('in_stock', product.in_stock);
    formData.append('type_of_product', product.type_of_product);
    formData.append('count_of_sealing_conturs', product.count_of_sealing_conturs.toString());
    formData.append('door_leaf_material', product.door_leaf_material);
    formData.append('door_frame_material', product.door_frame_material);
    formData.append('door_purpose', product.door_purpose);
    formData.append('door_fill', product.door_fill);
    formData.append('door_application', product.door_application);
    formData.append('door_opening_method', product.door_opening_method);
    formData.append('door_type', product.door_type);
    formData.append('door_opening_type', product.door_opening_type);
    formData.append('door_area_material', product.door_area_material);
    formData.append('sail', product.sail);
    formData.append('home_page', product.home_page ? product.home_page.toString() : 'false')
    formData.append('description', product.description);
    if(image){
      formData.append('image', image, image.name);
    }

    return this.http.post<ProductI>(BASE_URL + '/api/products', formData)
  }

  public updateProduct(product: ProductI, image: File | null): Observable<ProductI>{
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('installationPrice', product.installationPrice.toString());
    formData.append('brand', product.brand);
    formData.append('country', product.country);
    formData.append('guarantee_time', product.guarantee_time);
    formData.append('state', product.state);
    formData.append('in_stock', product.in_stock);
    formData.append('type_of_product', product.type_of_product);
    formData.append('count_of_sealing_conturs', product.count_of_sealing_conturs.toString());
    formData.append('door_leaf_material', product.door_leaf_material);
    formData.append('door_frame_material', product.door_frame_material);
    formData.append('door_purpose', product.door_purpose);
    formData.append('door_fill', product.door_fill);
    formData.append('door_application', product.door_application);
    formData.append('door_opening_method', product.door_opening_method);
    formData.append('door_type', product.door_type);
    formData.append('door_opening_type', product.door_opening_type);
    formData.append('door_area_material', product.door_area_material);
    formData.append('sail', product.sail);
    formData.append('home_page', product.home_page.toString());
    formData.append('description', product.description);
    if(image){
      formData.append('image', image, image.name);
    }
    return this.http.put<ProductI>(BASE_URL + `/api/products/${product._id}`, formData)
  }

  public deleteProduct(id: string): Observable<ProductI>{
    return this.http.delete<ProductI>(BASE_URL + `/api/products/${id}`)
  }

  public getProducts(): Observable<ProductI[]>{
    return this.http.get<ProductI[]>(BASE_URL + '/api/products')
  }

  public createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(BASE_URL + '/api/orders', order)
  }

  public getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(BASE_URL + '/api/orders')
  }

  public compliteOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(BASE_URL + `/api/orders/${order._id}`, order);
  }

  public deleteOrder(id: string): Observable<Order>{
    return this.http.delete<Order>(BASE_URL + `/api/orders/${id}`)
  }

  public getProductProducers(): Observable<productProducerI[]>{
    return this.http.get<productProducerI[]>(BASE_URL + '/api/product-producers')
  }

  public createProductProducer(productProducer: productProducerI): Observable<productProducerI>{
    return this.http.post<productProducerI>(BASE_URL + `/api/product-producers`, productProducer);
  }

  public updateProductProducer(productProducer: productProducerI): Observable<productProducerI>{
    return this.http.put<productProducerI>(BASE_URL + `/api/product-producers/${productProducer._id}`, productProducer)
  }

  public deleteProductProducer(id: string): Observable<productProducerI>{
    return this.http.delete<productProducerI>(BASE_URL + `/api/product-producers/${id}`);
  }

  public sendConsultaionForm(userData: {name: string, phone: string}): Observable<{name: string, phone: string}>{
    return this.http.post<{name: string, phone: string}>(BASE_URL + '/api/consultation-form', userData);
  }

  public sendFreeSampleForm(userData: {name: string, phone: string, address: string}): Observable<{name: string, phone: string, address: string}>{
    return this.http.post<{name: string, phone: string, address: string}>(BASE_URL + '/api/free-sample-form', userData);
  }

  public getInteriorDoor(): Observable<interiorDoorI[]>{
    return this.http.get<interiorDoorI[]>(BASE_URL + '/api/interiorDoors')
  }

  public createInteriorDoor(interiorDoor: interiorDoorI, image: File | null): Observable<interiorDoorI>{
    const formData = new FormData();
    formData.append('name', interiorDoor.name);
    formData.append('price', interiorDoor.price.toString());
    formData.append('installationPrice', interiorDoor.installationPrice.toString());
    formData.append('typeOfProduct', interiorDoor.typeOfProduct);
    formData.append('brand', interiorDoor.brand);
    formData.append('country', interiorDoor.country);
    formData.append('guarantee', interiorDoor.guarantee);
    formData.append('state', interiorDoor.state);
    formData.append('inStock', interiorDoor.inStock);
    formData.append('description', interiorDoor.description);
    formData.append('finishingTheSurface', JSON.stringify(interiorDoor.finishingTheSurface));
    formData.append('frameMaterial', JSON.stringify(interiorDoor.frameMaterial));
    formData.append('structuralFeatures', JSON.stringify(interiorDoor.structuralFeatures));
    formData.append('openingType', JSON.stringify(interiorDoor.openingType));
    formData.append('installationType', JSON.stringify(interiorDoor.installationType));
    formData.append('openingMethod', JSON.stringify(interiorDoor.openingMethod));

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', interiorDoor.homePage 
    ? interiorDoor.homePage.toString() 
    : 'false')
    console.log(formData);
    return this.http.post<interiorDoorI>(BASE_URL + '/api/interiorDoors', formData)
  }

  public updateInteriorDoor(interiorDoor: interiorDoorI, image: File | null): Observable<interiorDoorI>{
    const formData = new FormData();
    formData.append('name', interiorDoor.name);
    formData.append('price', interiorDoor.price.toString());
    formData.append('installationPrice', interiorDoor.installationPrice.toString());
    formData.append('typeOfProduct', interiorDoor.typeOfProduct);
    formData.append('brand', interiorDoor.brand);
    formData.append('country', interiorDoor.country);
    formData.append('guarantee', interiorDoor.guarantee);
    formData.append('state', interiorDoor.state);
    formData.append('inStock', interiorDoor.inStock);
    formData.append('description', interiorDoor.description);

    formData.append('finishingTheSurface', JSON.stringify(interiorDoor.finishingTheSurface));
    formData.append('frameMaterial', JSON.stringify(interiorDoor.frameMaterial));
    formData.append('structuralFeatures', JSON.stringify(interiorDoor.structuralFeatures));
    formData.append('openingType', JSON.stringify(interiorDoor.openingType));
    formData.append('installationType', JSON.stringify(interiorDoor.installationType));
    formData.append('openingMethod', JSON.stringify(interiorDoor.openingMethod));

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', interiorDoor.homePage 
    ? interiorDoor.homePage.toString() 
    : 'false')
    return this.http.put<interiorDoorI>(BASE_URL + `/api/interiorDoors/${interiorDoor._id}`, formData)
  }
  
  public deleteInteriorDoor(id: string): Observable<interiorDoorI>{
    return this.http.delete<interiorDoorI>(BASE_URL + `/api/interiorDoors/${id}`)
  }

  public getEntranceDoor(): Observable<entranceDoorI[]>{
    return this.http.get<entranceDoorI[]>(BASE_URL + '/api/entranceDoors')
  }

  public createEntranceDoor(entranceDoor: entranceDoorI, image: File | null): Observable<entranceDoorI>{
    const formData = new FormData();

    formData.append('name', entranceDoor.name);
    formData.append('price', entranceDoor.price.toString());
    formData.append('installationPrice', entranceDoor.installationPrice.toString());
    formData.append('typeOfProduct', entranceDoor.typeOfProduct);
    formData.append('brand', entranceDoor.brand);
    formData.append('country', entranceDoor.country);
    formData.append('guarantee', entranceDoor.guarantee);
    formData.append('state', entranceDoor.state);
    formData.append('inStock', entranceDoor.inStock);
    formData.append('description', entranceDoor.description);

    formData.append('amountOfSealingMaterials',  JSON.stringify(entranceDoor.amountOfSealingMaterials))
    formData.append('fabricMaterial', JSON.stringify(entranceDoor.fabricMaterial))
    formData.append('purpose',JSON.stringify(entranceDoor.purpose));
    formData.append('openingMethod', JSON.stringify(entranceDoor.openingMethod));
    formData.append('covering', JSON.stringify(entranceDoor.covering));
    formData.append('frameMaterial', JSON.stringify(entranceDoor.frameMaterial)); 

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', entranceDoor.homePage 
    ? entranceDoor.homePage.toString() 
    : 'false')



    return  this.http.post<entranceDoorI>(BASE_URL + '/api/entranceDoors', formData)
  }

  public updateEntranceDoor(entranceDoor: entranceDoorI, image: File | null): Observable<entranceDoorI>{
    const formData = new FormData();

    formData.append('name', entranceDoor.name);
    formData.append('price', entranceDoor.price.toString());
    formData.append('installationPrice', entranceDoor.installationPrice.toString());
    formData.append('typeOfProduct', entranceDoor.typeOfProduct);
    formData.append('brand', entranceDoor.brand);
    formData.append('country', entranceDoor.country);
    formData.append('guarantee', entranceDoor.guarantee);
    formData.append('state', entranceDoor.state);
    formData.append('inStock', entranceDoor.inStock);
    formData.append('description', entranceDoor.description);

    formData.append('amountOfSealingMaterials',  JSON.stringify(entranceDoor.amountOfSealingMaterials))
    formData.append('fabricMaterial', JSON.stringify(entranceDoor.fabricMaterial))
    formData.append('purpose',JSON.stringify(entranceDoor.purpose));
    formData.append('openingMethod', JSON.stringify(entranceDoor.openingMethod));
    formData.append('covering', JSON.stringify(entranceDoor.covering));
    formData.append('frameMaterial', JSON.stringify(entranceDoor.frameMaterial)); 

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', entranceDoor.homePage 
    ? entranceDoor.homePage.toString() 
    : 'false')

    return this.http.put<entranceDoorI>(BASE_URL + '/api/entranceDoors/' + entranceDoor._id, formData)
  }

  public deleteEntranceDoor(id: string): Observable<entranceDoorI>{
    return this.http.delete<entranceDoorI>(BASE_URL + '/api/entranceDoors/' + id)
  }


}
