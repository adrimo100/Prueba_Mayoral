import {css, html, LitElement} from "lit";
import {customElement, property} from 'lit/decorators.js';
import Product from "../constants/Product";

@customElement('card-component')
export default class CardComponent extends LitElement {

  @property()
  product?: Product;

  static override styles = css`
    .card {
      border: solid 1px rgba(100, 149, 237, 0.4);
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 450px;
    }
    .card img {
      height: 150px;
      width: 190px;
    }

    .card .card-description {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 190px;
    }

    .card .card-description:hover {
      white-space: pre-wrap;
      max-width: 190px;
    }

    .card .discount-price {
      color: red
    }

    .card .more-colors {
      color: gray
    }

    .line-through {
      text-decoration: line-through;
    }

    .invisible {
      visibility: hidden;
    }

    button{
      background: #2971CE;
      color: white;
      border-radius: 5px;
      border: none;
      padding: 5px;
    }

    button:hover{
      background: blue;
    }

    button:active {
      background: darkblue;
    }
  `

  constructor() {
    super();

    console.log(this.product)
  }

  override render() {
    return html`
      <div class="card">
        <img src="${this.product?.imageRoute}" alt="no-image">
        <p class="card-description" >${this.product?.description ?? 'no-description'}</p>
        <p class="${this.product?.discount ? 'line-through' : ''}">${'18,99'}€</p>
        <p class="discount-price ${!this.product?.discount ? 'invisible' : ''}">${this.getPriceWithDiscount(this.product?.price ?? 0, this.product?.discount ?? 0)}€(-${this.product?.discount}%)</p>
        <p class="more-colors ${!this.product?.moreColors ? 'invisible' : ''}">más colores</p>
        <button>AÑADIR</button>
      </div>
    `
  }

  private getPriceWithDiscount(originalPrice: number, discount: number): string {
    const priceWithDiscount = originalPrice * (1 - discount / 100);
    return priceWithDiscount.toFixed(2).replace('.', ',');
  }

}
