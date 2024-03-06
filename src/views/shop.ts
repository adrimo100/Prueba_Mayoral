import {css, html, LitElement} from "lit";
import {customElement, state} from 'lit/decorators.js';
import "../components/headbar";
import "../components/card"
import Store from "../store/store";
import Product from "../constants/Product";
import Order from "../constants/Order";
import Column from "../constants/Column";

@customElement('shop-view')
export class ShopView extends LitElement {

  @state()
  private _productsList: Product[] = []

  @state()
  private currentOrder: Order = Order.Ascendant;

  private currentInputFilterValue = ''

  static override styles = css`
    .product-list {
      display: grid;
      grid-template-columns: repeat(var(--mayor-num-columns), minmax(150px, 1fr));
      gap: 20px;
      justify-content: center;
    }

    @media only screen and (max-width: 900px) {
      .product-list {
        grid-template-columns: repeat(var(--minor-num-columns), minmax(150px, 1fr));
      }
    }

    main {
      display: flex;
      justify-content: center;
    }
  `

  constructor() {
    super();
    new Store();

    this.getProductsList();
  }

  override render(): unknown {
    return html`
      <headbar-component
        @newOrderValue="${(e: CustomEvent) => {
        this.currentOrder = +e.detail;
        this.getProductsList();
      }}"
        @newInputValue="${(event: CustomEvent) => {
        this.currentInputFilterValue = event.detail;
        this.getProductsList();
      }}"
        @newColumnValue="${this.setColumns}"
      ></headbar-component>

      <main>
        <div class="product-list">
          ${this._productsList.map((product) => {
            return html`
        <card-component .product="${product}"></card-component>
        `
          })}
        </div>
      </main>
    `
  }

  private async getProductsList() {
    const productsArray= await Store.storeSingleton?.loadData() ?? [];

    const filterdArray = this.currentInputFilterValue ? productsArray.filter(product => product.description.toLowerCase().includes(this.currentInputFilterValue.toLowerCase())) : productsArray

    this._productsList = filterdArray.sort((a, b) => this.sortProductsByPrice(a, b))
  }

  private sortProductsByPrice(a: Product, b: Product) {
    if (this.currentOrder === Order.Ascendant) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  }

  private setColumns(e: CustomEvent) {
    if(+e.detail === Column.L) {
      document.documentElement.style.setProperty('--mayor-num-columns', '4');
      document.documentElement.style.setProperty('--minor-num-columns', '3');
    }
    else {
      document.documentElement.style.setProperty('--mayor-num-columns', '3');
      document.documentElement.style.setProperty('--minor-num-columns', '2');
    }
  }
}
