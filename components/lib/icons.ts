// @ts-ignore
import { getAttributes, toString } from '@carbon/icon-helpers'

interface CarbonIcon {
  attrs: any;
  content: any;
  elem: string;
  name: string;
  size: number;
}

const iconMap: { [key: string]: { default: CarbonIcon } } = {
  // @ts-ignore
  'address': await import('./carbon-icons/password/16.js'),
  // @ts-ignore
  'copy': await import('./carbon-icons/copy/16.js'),
  // @ts-ignore
  'jig': await import('./carbon-icons/settings/16.js'),
  // @ts-ignore
  'lock': await import('./carbon-icons/locked/16.js'),
  // @ts-ignore
  'warning': await import('./carbon-icons/warning--alt/16.js'),
}

export function getIcon(name: string): CarbonIcon | undefined {
  return iconMap[name]?.default
}
