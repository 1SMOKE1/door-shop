import { Injectable } from '@angular/core';
import { CartLine } from 'src/app/models/cart-line.model';
import { ProductI } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartLines: CartLine[] = [];
  constructor() { }

  public getCartLines(): CartLine[]{
    return this.cartLines
  }

  public addCartLine(product: ProductI): void{
    if(this.hasCartLine(product._id)){
      this.increase(product._id);
    } else {
      this.cartLines.push(new CartLine(product));
    }
  }

  public increase(id: string): void{
    if(this.hasCartLine(id)){
      this.getCartLine(id).increase()
    } 
  }

  public decrease(id: string): void{
    if(this.hasCartLine(id)){
      this.getCartLine(id).decrease();
    }
  }

  public getTotal(): number{
    return this.cartLines.reduce((acc, line) => acc + line.subTotal, 0)
  }

  public deleteCardLine(id: string): void{
    if(this.hasCartLine(id))
      this.cartLines = this.cartLines.filter((el: CartLine) => el.product._id !== id);
  }

  private getCartLine(id: string): CartLine{
    const cartLine = this.locator(id);
    if(cartLine){
      return cartLine
    } else {
      throw new Error(`not Found CardLine with - ${id} id`)
    }
  }

  private hasCartLine(_id: string): boolean{
    return !!this.locator(_id)
  }

  private locator(id: string): CartLine | undefined{
    return this.cartLines.find((line: CartLine) => line.product._id === id)
  }

  public clearCarts(): void{
    this.cartLines = [];
  }
}
