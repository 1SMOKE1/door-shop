import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { carouselImageI } from '../interfaces/carouselImageI';
import { Observable } from 'rxjs';
import { ProductI } from '../interfaces/product';
import { Order } from '../models/order.model';
import { productProducerI } from '../interfaces/productProducer';
import { BASE_URL } from './constants/urls';



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
}
