import { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import type { LockLabel } from './LockLabel'
import './LockLabel'
import './LockLabelLink'

export default {
  title: 'Explorer/LockLabel',
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Aldea LockType',
      control: { type: 'radio' },
      options: ['address', 'jig', 'public', 'frozen'],
    },
  },
} satisfies Meta<LockLabel>

export const AddressLockLabel: StoryObj<LockLabel> = {
  args: { type: 'address' },
  render: (args) => html`
    <a-lock-label type="${args.type}">
      <a-lock-label-link type="${args.type}">addr18kglj…lxq0t</a-lock-label-link>
    </a-lock-label>
  `
}

export const JigLockLabel: StoryObj<LockLabel> = {
  args: { type: 'jig' },
  render: (args) => html`
    <a-lock-label type="${args.type}">
      <a-lock-label-link type="${args.type}">5c73bb9…ea2033d</a-lock-label-link>
    </a-lock-label>
  `
}

export const PublicLockLabel: StoryObj<LockLabel> = {
  args: { type: 'public' },
  render: (args) => html`
    <a-lock-label type="${args.type}"></a-lock-label>
  `
}


export const FrozenLockLabel: StoryObj<LockLabel> = {
  args: { type: 'frozen' },
  render: (args) => html`
    <a-lock-label type="${args.type}"></a-lock-label>
  `
}