import {css, html, LitElement} from "lit";
import {customElement, query, state} from 'lit/decorators.js';
import Order from "../constants/Order";
import Column from "../constants/Column";

@customElement('headbar-component')
export default class HeadbarComponent extends LitElement {

  private inputTimerSubscription: NodeJS.Timeout | null = null;

  @query('#productFilter')
  input!: HTMLInputElement;

  @state()
  private curretColumn: Column = Column.L;

  static override styles = css`
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 20px;
    }

    input {
      margin-top: 10px;
      margin-bottom: 35px;
      border-radius: 5px;
      border: 2px #ACABAB solid;
      position: relative;
      display: inline-block;
    }

    input::placeholder {
      color: #ACABAB;
    }

    .input-icon {
      width: 35%;
      display: flex;
      align-items: center;
    }

    .input-icon svg {
      position: absolute;
      z-index: 1;
      color: #ACABAB;
      top: 13px;
      left: 15px;
    }

    .input-icon input {
      padding: 5px 0px 5px 30px;
      width: 100%;
      margin: 0px;
    }

    .row-controller{
      margin-left: auto;
    }

    #order{
      height: 50%;
      margin-left: 5px;
    }

  `;

  override render() {
    return html`
      <header>
        <div class="input-icon">
          <svg width="20" height="20" className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <input @input="${this.onInputChange}" type="text" placeholder="Buscar" id="productFilter">
        </div>
        <select name="orden" id="order"  @input="${this.onOrderChange}">
          <option value="${Order.Ascendant}" selected>Ascendente</option>
          <option value="${Order.Descendent}">Descendente</option>
        </select>
        <div class="row-controller">
          <button ?hidden="${this.curretColumn == Column.L}" class="w-16  bg-gray-300 focus:bg-gray-400 text-gray-800 font-bold rounded mt-3 h-8 pt-0.5" @click="${() => this.onColumnsChange(Column.L)}">
            +
          </button>
          <button ?hidden="${this.curretColumn == Column.S}"
            class="w-16  bg-gray-300 focus:bg-gray-400 text-gray-800 font-bold rounded mt-3 h-8 pt-0.5 ml-2" @click="${() => this.onColumnsChange(Column.S)}">
            -
          </button>
        </div>
      </header>
    `
  }

  emitCustomEvent(value: string) {
    this.dispatchEvent(new CustomEvent<string>('newInputValue', {
      detail: value,
      bubbles: true,
      composed: true
    }))
  }

  onInputChange(){
    if(this.inputTimerSubscription){
      clearTimeout(this.inputTimerSubscription)
    }

    this.inputTimerSubscription = setTimeout(() => {
      this.emitCustomEvent(this.input.value.trim())
    }, 500)
  }

  onOrderChange(e: any){
    this.dispatchEvent(new CustomEvent<string>('newOrderValue', {
      detail: e.target.value,
      bubbles: true,
      composed: true
    }))
  }

  onColumnsChange(value: Column){
    this.curretColumn = value
    this.dispatchEvent(new CustomEvent<string>('newColumnValue', {
      detail: value.toString(),
      bubbles: true,
      composed: true
    }))
  }
}
