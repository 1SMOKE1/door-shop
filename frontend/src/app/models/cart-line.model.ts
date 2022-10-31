import { ProductModel } from "./product.model";

export class CartLine{
  public quantity: number = 1;
  constructor(
    public product: ProductModel
  ){}

  get subTotal(): number{
    return this.product.price * this.quantity;
  }

  public increase(): void{
    ++this.quantity
  }

  public decrease(): void{
    if(this.quantity >= 2){
      --this.quantity;
    }
  }
}