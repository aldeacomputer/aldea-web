import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './Icon'

const icons = {
  // @ts-ignore
  'address': await import('../../lib/carbon-icons/password/16.js'),
  // @ts-ignore
  'copy': await import('../../lib/carbon-icons/copy/16.js'),
  // @ts-ignore
  'jig': await import('../../lib/carbon-icons/settings/16.js'),
}

export type LockLabelLinkType = 'address' | 'jig';

@customElement('a-lock-label-link')
export class LockLabelLink extends LitElement {
  @property({ type: String })
  type!: LockLabelLinkType;

  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--a-font-family-mono);
      font-size: 13px;
    }
    .flex {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .link {
      color: var(--blue-40, #8FC2D7);
      cursor: pointer;
      transition: color 0.15s ease-out;
    }
    .link:hover {
      color: white;
    }
  `

  override render() {

    return html`
      <div class="flex link" @click="${this.handleClick}">
        <a-icon .data="${icons[this.type].default}"></a-icon>
        <slot></slot>
      </div>
      <a-icon
        .data="${icons.copy.default}"
        class="link"
        @click="${this.handleCopy}">
      </a-icon>
    `
  }

  private handleClick() {
    this.dispatchEvent(new CustomEvent('click'))
  }

  private handleCopy() {
    this.dispatchEvent(new CustomEvent('copy'))
  }
}