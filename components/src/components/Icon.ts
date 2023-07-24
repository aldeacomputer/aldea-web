import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
// @ts-ignore
import { getAttributes, toString } from '@carbon/icon-helpers'

@customElement('a-icon')
export class Icon extends LitElement {
  @property({ type: Object })
  data!: Record<string, any>;

  @property({ type: Number })
  size: number = 16;

  static override styles = css`
    :host {
      display: block;
    }
    svg {
      display: block;
    }
  `

  override render() {
    const attrs = {...getAttributes(this.data.attrs), width: this.size, height: this.size}
    const svg = toString({ ...this.data, attrs })
    return html`
      ${unsafeSVG(svg)}
    `;
  }

}