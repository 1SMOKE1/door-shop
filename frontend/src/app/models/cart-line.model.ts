import { productMultiSingleType } from "../interfaces/multiType";
import { entranceDoorModel } from "./entranceDoor.model";
import { FurnituraModel } from "./furnitura.model";
import { interiorDoorModel } from "./interiorDoor.model";
import { ProductModel } from "./product.model";
import { windowModel } from "./window.model";

export class CartLine{
  public quantity: number = 1;
  constructor(
    public product: productMultiSingleType,
    
  ){

  }

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