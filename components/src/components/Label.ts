import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './Icon'

export type LabelType = 'info' | 'success' | 'warning' | 'error';

@customElement('a-label')
export class Label extends LitElement {
  @property({ type: String })
  type: LabelType = 'info';

  @property({ type: Boolean })
  bordered = false;

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      height: 24px;
      padding: 2px 12px;
      gap: 8px;
      font-family: var(--a-font-family-sans, 'IBM Plex Sans', sans-serif);
      font-size: 14px;
      color: var(--a-color-text-secondary, #c6c6c6);
      background: var(--a-color-layer1, #262626);
      border-radius: 2px;
    }
    :host([bordered]) {
      border-left: 4px solid var(--tag-gray-background, #525252);
    }
    :host([type=info]) {
      color: var(--blue-40, #8FC2D7);
      border-color: var(--blue-40, #8FC2D7);
    }
    :host([type=success]) {
      color: var(--green-40, #42BE65);
      border-color: var(--green-40, #42BE65);
    }
    :host([type=warning]) {
      color: var(--yellow-20, #FDDC69);
      border-color: var(--yellow-20, #FDDC69);
    }
    :host([type=error]) {
      color: var(--red-40, #FF8389);
      border-color: var(--red-40, #FF8389);
    }
  `

override render() {
  return html`
    <span><slot></slot></span>
    <slot name="icon"></slot>
  `;
}

}