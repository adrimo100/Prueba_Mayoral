import {css, html, LitElement} from "lit";
import {customElement, state} from 'lit/decorators.js';
import "../components/headbar";
import "../components/card"
import Store from "../store/store";
import Product from "../constants/Product";

@customElement('shop-view')
export class ShopView extends LitElement {

  @state()
  private _productsList: Product[] = []

  static override styles = css`
    .product-list {
      display: grid;
      grid-template-columns: repeat(4, minmax(150px, 1fr));
      gap: 20px;
      width: fit-content;
    }
  `

  constructor() {
    super();
    new Store();

    this.getProductsList();

  }

  override render(): unknown {
    return html`
      <headbar-component></headbar-component>
      <div class="product-list">
        ${this.getProductsCards()}
      </div>
    `
  }

  private async getProductsList() {
    this._productsList = await Store.storeSingleton?.loadData() ?? [];
  }

  private readonly getProductsCards = () => {
   return this._productsList.map((product) => {
      return html`
      <card-component .product="${product}"></card-component>
      `
    })
  }
}
