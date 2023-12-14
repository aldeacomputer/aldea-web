import { getAttributes, toString } from '@carbon/icon-helpers'
import {
  ArrowDown20,
  ArrowRight20,
  ArrowUpRight20,
  BlockStorage20,
  Book20,
  CheckmarkOutline20,
  Compass20,
  DotMark20,
  EdgeCluster20,
  Explore20,
  Group20,
  IntentRequestScaleOut20,
  LogoGithub20,
  LogoLinkedin20,
  LogoTwitter20,
  PlayOutline20,
  Money20,
  Rocket20,
  Task20,
} from './carbon-icons/index'

interface CarbonIcon {
  attrs: any;
  content: any;
  elem: string;
  name: string;
  size: number;
}

const iconMap: { [key: string]: CarbonIcon } = {
  'arrow-down': ArrowDown20,
  'arrow-right': ArrowRight20,
  'arrow-up-right': ArrowUpRight20,
  'block-storage': BlockStorage20,
  'book': Book20,
  'checkmark': CheckmarkOutline20,
  'compass': Compass20,
  'dot': DotMark20,
  'edge-cluster': EdgeCluster20,
  'explore': Explore20,
  'github': LogoGithub20,
  'group': Group20,
  'linkedin': LogoLinkedin20,
  'money': Money20,
  'play': PlayOutline20,
  'rocket': Rocket20,
  'scale-out': IntentRequestScaleOut20,
  'task': Task20,
  'twitter': LogoTwitter20,
}

export function icon(name: string, classes?: string): string | undefined {
  const icon = iconMap[name]
  const attrs = { ...getAttributes(icon.attrs), class: `icon ${classes}` }
  return icon && toString({ ...icon, attrs })
}
