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

  private currentInputFilterValue = ''

  static override styles = css`
    :root {
      --mayor-l-num-columns: 4;
      --minor-l-num-columns: 3;
      --mayor-s-num-columns: 3;
      --minor-s-num-columns: 2;
    }

    .product-list {
      display: grid;
      grid-template-columns: repeat(4, minmax(150px, 1fr));
      gap: 20px;
      justify-content: center;
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
      <headbar-component @newInputValue="${(event: CustomEvent) => {
        this.currentInputFilterValue = event.detail;
        this.getProductsList();
      }}"></headbar-component>
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

    this._productsList = this.currentInputFilterValue ? productsArray.filter(product => product.description.toLowerCase().includes(this.currentInputFilterValue.toLowerCase())) : productsArray
  }
}
