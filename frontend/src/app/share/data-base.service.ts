import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { carouselImageI } from '../interfaces/carouselImageI';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { productProducerI } from '../interfaces/productProducer';
import { BASE_URL } from './constants/urls';
import { interiorDoorI } from '../interfaces/interiorDoorI';
import { entranceDoorI } from '../interfaces/entranceDoor';
import { windowI } from '../interfaces/window';
import { furnituraI } from '../interfaces/furnitura';
import { NumberInput } from '@angular/cdk/coercion';
import { productMultiSingleType } from '../interfaces/multiType';



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

  public getInteriorDoors(): Observable<interiorDoorI[]>{
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

  public getEntranceDoors(): Observable<entranceDoorI[]>{
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

  public getWindows(): Observable<windowI[]>{
    return this.http.get<windowI[]>(BASE_URL + '/api/windows')
  }

  public createWindow(window: windowI, image: File | null): Observable<windowI>{
    const formData = new FormData();

    formData.append('name', window.name);
    formData.append('price', window.price.toString());
    formData.append('installationPrice', window.installationPrice.toString());
    formData.append('typeOfProduct', window.typeOfProduct);
    formData.append('brand', window.brand);
    formData.append('country', window.country);
    formData.append('guarantee', window.guarantee);
    formData.append('state', window.state);
    formData.append('inStock', window.inStock);
    formData.append('description', window.description);

    formData.append('profile',  JSON.stringify(window.profile))
    formData.append('construction', JSON.stringify(window.construction))
    formData.append('glassUnit',JSON.stringify(window.glassUnit));
    formData.append('lamination', JSON.stringify(window.lamination));
    formData.append('glasses', JSON.stringify(window.glasses));

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', window.homePage 
    ? window.homePage.toString() 
    : 'false')



    return  this.http.post<windowI>(BASE_URL + '/api/windows', formData)
  }

  public updateWindow(window: windowI, image: File | null): Observable<windowI>{
    const formData = new FormData();

    formData.append('name', window.name);
    formData.append('price', window.price.toString());
    formData.append('installationPrice', window.installationPrice.toString());
    formData.append('typeOfProduct', window.typeOfProduct);
    formData.append('brand', window.brand);
    formData.append('country', window.country);
    formData.append('guarantee', window.guarantee);
    formData.append('state', window.state);
    formData.append('inStock', window.inStock);
    formData.append('description', window.description);

    formData.append('profile',  JSON.stringify(window.profile))
    formData.append('construction', JSON.stringify(window.construction))
    formData.append('glassUnit',JSON.stringify(window.glassUnit));
    formData.append('lamination', JSON.stringify(window.lamination));
    formData.append('glasses', JSON.stringify(window.glasses));

    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', window.homePage 
    ? window.homePage.toString() 
    : 'false')



    return  this.http.put<windowI>(BASE_URL + '/api/windows/' + window._id, formData)
  }

  public deleteWindow(id: string): Observable<windowI>{
    return this.http.delete<windowI>(BASE_URL + '/api/windows/' + id)
  }

  public getFurnituras(): Observable<furnituraI[]>{
    return this.http.get<furnituraI[]>(BASE_URL + '/api/furnituras');
  }

  public createFurnitura(furnitura: furnituraI, image: File | null): Observable<furnituraI>{
    const formData = new FormData();

    formData.append('name', furnitura.name);
    formData.append('price', furnitura.price.toString());
    formData.append('installationPrice', furnitura.installationPrice.toString());
    formData.append('typeOfProduct', furnitura.typeOfProduct);
    formData.append('brand', furnitura.brand);
    formData.append('country', furnitura.country);
    formData.append('guarantee', furnitura.guarantee);
    formData.append('state', furnitura.state);
    formData.append('inStock', furnitura.inStock);
    formData.append('description', furnitura.description);
    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', furnitura.homePage 
    ? furnitura.homePage.toString() 
    : 'false')


    return this.http.post<furnituraI>(BASE_URL + '/api/furnituras', formData)
  }

  public updateFurnitura(furnitura: furnituraI, image: File | null): Observable<furnituraI>{
    const formData = new FormData();

    formData.append('name', furnitura.name);
    formData.append('price', furnitura.price.toString());
    formData.append('installationPrice', furnitura.installationPrice.toString());
    formData.append('typeOfProduct', furnitura.typeOfProduct);
    formData.append('brand', furnitura.brand);
    formData.append('country', furnitura.country);
    formData.append('guarantee', furnitura.guarantee);
    formData.append('state', furnitura.state);
    formData.append('inStock', furnitura.inStock);
    formData.append('description', furnitura.description);
    if(image){
      formData.append('image', image, image.name);
    }

    formData.append('homePage', furnitura.homePage 
    ? furnitura.homePage.toString() 
    : 'false')
    return this.http.put<furnituraI>(BASE_URL + '/api/furnituras/' + furnitura._id, formData)
  }

  public deleteFurnitura(id: string): Observable<furnituraI>{
    return this.http.delete<furnituraI>(BASE_URL + '/api/furnituras/' + id)
  }

  public filterCheckBox(data: productProducerI[]): Observable<productMultiSingleType[]>{
    return this.http.post<productMultiSingleType[]>(BASE_URL + `/api/checkboxFiltration`, data)
  }


}
