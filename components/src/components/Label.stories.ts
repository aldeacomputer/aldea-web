import { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import type { Label } from './Label'
import './Label'
import './Icon'
import { getIcon } from '../../lib/icons'

export default {
  title: 'Explorer/Label',
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Label type',
      control: { type: 'radio' },
      options: ['info', 'success', 'warning', 'error'],
    },
    bordered: {
      description: 'Label with border',
      control: { type: 'boolean' },
    }
  },
} satisfies Meta<Label>

export const TextLabel: StoryObj<Label> = {
  args: { type: 'info', bordered: false },
  render: (args) => {
    const label = args.type.charAt(0).toUpperCase() + args.type.slice(1)
    return html`
      <a-label
        type="${args.type}"
        ?bordered=${args.bordered}>
        ${label}
      </a-label>
    `
  },
}

export const IconLabel: StoryObj<Label> = {
  args: { type: 'warning', bordered: true },
  render: (args) => {
    const label = args.type.charAt(0).toUpperCase() + args.type.slice(1)
    return html`
      <a-label
        type="${args.type}"
        ?bordered=${args.bordered}>
        ${label}
        <a-icon slot="icon" .data="${getIcon('warning')}" size="14"></a-icon>
      </a-label>
    `
  },
}