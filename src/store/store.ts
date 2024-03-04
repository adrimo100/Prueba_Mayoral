import Product from "../constants/Product";

class Store {
  public static storeSingleton?: Store;

  constructor() {
    if(!Store.storeSingleton){
      Store.storeSingleton = this
    }
  }

  public async loadData(): Promise<Product[]> {
    const response = await fetch('dist/products.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    return data;
  }
}

export default Store;
