import { CartLine } from "./cart-line.model";

export type kind_of_payvment_type = 'Готівка' | 'Карта';

export class Order{
  constructor(
    public name: string,
    public phone: string,
    public address: string,
    public email: string,
    public cartLines: CartLine[],
    public shiped: boolean,
    public total_cost: number,
    public kindOfPayvment: kind_of_payvment_type,
    public _id?: string,
  ){}
}