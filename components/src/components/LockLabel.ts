import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './Icon'

export type LockLabelType = 'address' | 'jig' | 'public' | 'frozen';

// @ts-ignore
const icon = await import('../../lib/carbon-icons/locked/16.js')

@customElement('a-lock-label')
export class LockLabel extends LitElement {
  @property({ type: String })
  type!: LockLabelType;

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      height: 40px;
      padding: 8px 16px 8px 12px;
      gap: 8px;
      font-family: var(--a-font-family-sans, 'IBM Plex Sans', sans-serif);
      font-size: 14px;
      color: var(--a-color-text-secondary, #c6c6c6);
      background: var(--a-color-layer1, #262626);
      border-left: 4px solid var(--tag-gray-background, #525252);
      border-radius: 2px;
    }
    :host([type=address]) {
      border-color: var(--tag-magenta-background, #9F1853);
    }
    :host([type=jig]) {
      border-color: var(--blue-60, #2C799B);
    }
    :host([type=public]) {
      border-color: var(--tag-purple-background, #6929C4);
    }
  `

  get hasLockee(): boolean {
    return ['address', 'jig'].includes(this.type)
  }

  get label(): string {
    const target = this.type.charAt(0).toUpperCase() + this.type.slice(1)
    if (['address', 'jig', 'public'].includes(this.type)) {
      return `Locked to ${target}${this.hasLockee ? ':' : ''}`
    } else {
      return target
    }
  }

  override render() {
    return html`
      <a-icon .data="${icon.default}"></a-icon>
      <span>${this.label}</span>
      ${this.hasLockee ? html`<slot></slot>` : ''}
    `;
  }
}
