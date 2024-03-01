export default interface Product {
  description: string;
  imageRoute: string;
  price: number;
  discount?: number;
  moreColors: boolean;
}
