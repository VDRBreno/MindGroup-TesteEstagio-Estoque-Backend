import { randomUUID } from 'node:crypto';

export default class Product {

  public readonly id: string;
  
  public name: string;
  public description: string;
  public image_name: string;
  public value: number;
  public quantity: number;
  
  public created_at: Date;

  constructor(
    props: Omit<Product, 'id' | 'created_at'>,
    optionals?: { id?: Product['id']; created_at?: Product['created_at']; }
  ) {
    this.id = optionals?.id ?? randomUUID();
    this.name = props.name.trim();
    this.description = props.description.trim();
    this.image_name = props.image_name;
    this.value = props.value;
    this.quantity = props.quantity;
    this.created_at = optionals?.created_at ?? new Date()
  }

}